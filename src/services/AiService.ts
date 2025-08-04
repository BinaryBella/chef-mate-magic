import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

export interface IngredientCategory {
  category: string;
  items: string[];
}

const IngredientCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

const IngredientCategoriesSchema = z.object({
  ingredients: z.array(IngredientCategorySchema),
});

export interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  servings: number;
  substitutions?: { original: string; alternative: string; reason: string }[];
}

const RecipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  prepTime: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  difficulty: z.string(),
  servings: z.number(),
  substitutions: z.array(
    z.object({
      original: z.string(),
      alternative: z.string(),
      reason: z.string(),
    })
  ), // <-- required, always an array
});

const RecipesSchema = z.object({
  recipes: z.array(RecipeSchema).min(3).max(5),
});


export async function fetchQuickPickIngredients(): Promise<IngredientCategory[]> {
  const response = await openai.responses.parse({
    temperature: 1,
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: "You are a perfect experienced senior chef can make incredible recipes using any ingredients for a cooking app.",
      },
      {
        role: "user",
        content:
        "Suggest 5-7 common ingredients for each of these categories: Proteins, Vegetables, Pantry Staples, Dairy, Herbs and Spices",
      },
    ],
    text: {
      format: zodTextFormat(IngredientCategoriesSchema, "ingredients"),
    },
  });
  console.log(response.output_parsed);
  
  return response.output_parsed.ingredients as IngredientCategory[];
}


export async function generateRecipes(
  ingredients: string[],
  diatoryInstructions: string
): Promise<Recipe[]> {
  const response = await openai.responses.parse({
    temperature: 1,
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: "You are a perfect experienced senior chef who can make incredible recipes using any ingredients for a cooking app.",
      },
      {
        role: "user",
        content: `
          Generate 3-5 recipe suggestions that use all ingredients. 
          A very short and catchy title (max 4 words).
          Prioritize recipes that minimize waste.
          Consider provided dietary restrictions. Include simple cooking instructions.
          Give time to cooking the recipe and servings. Categorize the cooking level as easy, medium, or hard.
          Give additional substitutions for food for ingredients.

          IMPORTANT: Strictly consider all the Dietary Restrictions before giving recipes and choosing ingredients for recipes.

          Ingredients:
          ${ingredients.join(", ")} 

          Dietary Restrictions:
          ${diatoryInstructions}
        `,
      },
    ],
    text: {
      format: zodTextFormat(RecipesSchema, "recipes"),
    },
  });

  const recipes = response.output_parsed.recipes as Recipe[];
  // Sort ingredients in each recipe by character count (ascending)
  recipes.forEach(recipe => {
    recipe.ingredients = recipe.ingredients.sort((a, b) => a.length - b.length);
  });
  return recipes;
}
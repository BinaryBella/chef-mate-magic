import { supabase } from "@/integrations/supabase/client";

export interface IngredientCategory {
  category: string;
  items: string[];
}

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

export async function fetchQuickPickIngredients(): Promise<IngredientCategory[]> {
  const { data, error } = await supabase.functions.invoke('generate-recipes', {
    body: { type: 'ingredients' }
  });

  if (error) {
    console.error('Error fetching ingredients:', error);
    throw new Error('Failed to fetch ingredients');
  }

  return data.ingredients as IngredientCategory[];
}

export async function generateRecipes(
  ingredients: string[],
  diatoryInstructions: string
): Promise<Recipe[]> {
  const { data, error } = await supabase.functions.invoke('generate-recipes', {
    body: { 
      type: 'recipes',
      ingredients,
      dietaryInstructions: diatoryInstructions
    }
  });

  if (error) {
    console.error('Error generating recipes:', error);
    throw new Error('Failed to generate recipes');
  }

  const recipes = data.recipes as Recipe[];
  // Sort ingredients in each recipe by character count (ascending)
  recipes.forEach(recipe => {
    recipe.ingredients = recipe.ingredients.sort((a, b) => a.length - b.length);
  });
  return recipes;
}
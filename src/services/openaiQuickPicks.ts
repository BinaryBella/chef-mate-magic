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

export async function fetchQuickPickIngredients(): Promise<IngredientCategory[]> {
  const response = await openai.responses.parse({
    temperature: 1,
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content: "You are a helpful assistant for a cooking app.",
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
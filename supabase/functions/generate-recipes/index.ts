import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, ingredients, dietaryInstructions } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (type === 'ingredients') {
      systemPrompt = "You are a perfect experienced senior chef who can make incredible recipes using any ingredients for a cooking app. Always respond with valid JSON format.";
      userPrompt = `Suggest 5-7 common ingredients for each of these categories: Proteins, Vegetables, Pantry Staples, Dairy, Herbs and Spices.

      Return the response in this exact JSON format:
      {
        "ingredients": [
          {
            "category": "Proteins",
            "items": ["chicken breast", "ground beef", "salmon", "eggs", "tofu"]
          },
          {
            "category": "Vegetables", 
            "items": ["onions", "tomatoes", "carrots", "spinach", "bell peppers"]
          },
          {
            "category": "Pantry Staples",
            "items": ["rice", "pasta", "olive oil", "garlic", "flour"]
          },
          {
            "category": "Dairy",
            "items": ["milk", "cheese", "butter", "yogurt", "cream"]
          },
          {
            "category": "Herbs and Spices",
            "items": ["salt", "pepper", "basil", "oregano", "paprika"]
          }
        ]
      }`;
    } else if (type === 'recipes') {
      systemPrompt = "You are a perfect experienced senior chef who can make incredible recipes using any ingredients for a cooking app. Always respond with valid JSON format.";
      userPrompt = `
        Generate 3-5 recipe suggestions that use the provided ingredients. Prioritize recipes that minimize waste.
        Consider provided dietary restrictions. Include simple cooking instructions.
        Give time to cooking the recipe and servings. Categorize the cooking level as easy, medium, or hard.
        Give additional substitutions for food for ingredients.

        IMPORTANT: Strictly consider all the Dietary Restrictions before giving recipes and choosing ingredients for recipes.

        Ingredients:
        ${ingredients?.join(", ") || ""} 

        Dietary Restrictions:
        ${dietaryInstructions || "None"}

        Return the response in this exact JSON format:
        {
          "recipes": [
            {
              "id": "unique-id",
              "title": "Recipe Name",
              "prepTime": "30 minutes",
              "ingredients": ["ingredient 1", "ingredient 2"],
              "instructions": ["step 1", "step 2", "step 3"],
              "difficulty": "easy",
              "servings": 4,
              "substitutions": [
                {
                  "original": "ingredient",
                  "alternative": "substitute",
                  "reason": "why this works"
                }
              ]
            }
          ]
        }
      `;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-recipes function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
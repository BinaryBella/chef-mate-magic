import { useState } from "react";
import BrandHeader from "@/components/BrandHeader";
import HeroSection from "@/components/HeroSection";
import IngredientInput from "@/components/IngredientInput";
import DietaryRestrictions from "@/components/DietaryRestrictions";
import GenerateButton from "@/components/GenerateButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import RecipeGrid from "@/components/RecipeGrid";
import RecipeModal from "@/components/RecipeModal";

interface Recipe {
  id: string;
  title: string;
  prepTime: string;
  ingredients: string[];
  instructions: string[];
  difficulty: string;
  servings: number;
  substitutions?: { original: string; alternative: string; reason: string }[];
}

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Chicken Bowl",
    prepTime: "25 mins",
    ingredients: ["Chicken breast", "Quinoa", "Cherry tomatoes", "Cucumber", "Feta cheese", "Olive oil", "Lemon"],
    instructions: [
      "Season chicken breast with salt, pepper, and Mediterranean herbs",
      "Heat olive oil in a pan and cook chicken for 6-7 minutes per side until golden",
      "Cook quinoa according to package instructions",
      "Dice tomatoes and cucumber into small pieces",
      "Slice cooked chicken and arrange over quinoa",
      "Top with vegetables, crumbled feta, and drizzle with lemon-olive oil dressing"
    ],
    difficulty: "Easy",
    servings: 2,
    substitutions: [
      { original: "Chicken breast", alternative: "Tofu", reason: "vegan" },
      { original: "Feta cheese", alternative: "Nutritional yeast", reason: "vegan" }
    ]
  },
  {
    id: "2",
    title: "Garlic Herb Roasted Potatoes",
    prepTime: "45 mins",
    ingredients: ["Baby potatoes", "Garlic", "Fresh rosemary", "Olive oil", "Salt", "Black pepper"],
    instructions: [
      "Preheat oven to 425°F (220°C)",
      "Wash and halve baby potatoes",
      "Toss potatoes with olive oil, minced garlic, chopped rosemary, salt and pepper",
      "Arrange in single layer on baking sheet",
      "Roast for 35-40 minutes until golden and crispy",
      "Garnish with fresh herbs before serving"
    ],
    difficulty: "Easy",
    servings: 4
  },
  {
    id: "3",
    title: "Creamy Tomato Pasta",
    prepTime: "20 mins",
    ingredients: ["Pasta", "Canned tomatoes", "Heavy cream", "Garlic", "Onion", "Basil", "Parmesan"],
    instructions: [
      "Cook pasta according to package directions",
      "Sauté minced garlic and diced onion until fragrant",
      "Add canned tomatoes and simmer for 10 minutes",
      "Stir in heavy cream and let simmer for 5 more minutes",
      "Add cooked pasta to sauce and toss to combine",
      "Serve topped with fresh basil and grated Parmesan"
    ],
    difficulty: "Medium",
    servings: 3,
    substitutions: [
      { original: "Heavy cream", alternative: "Coconut cream", reason: "dairy-free" },
      { original: "Parmesan", alternative: "Vegan parmesan", reason: "vegan" }
    ]
  }
];

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRecipes(mockRecipes);
      setIsLoading(false);
    }, 2500);
  };

  const handleOpenModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/lovable-uploads/2a473b6d-863c-4bd1-a3b9-4f167c36af81.png')`
      }}
    >
      <div className="min-h-screen flex">
        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 p-8 lg:pl-[8%] flex flex-col justify-center">
          <div className="max-w-[500px]">
            <BrandHeader />
            <HeroSection />
            <IngredientInput
              selectedIngredients={selectedIngredients}
              onIngredientsChange={setSelectedIngredients}
            />
            <DietaryRestrictions
              value={dietaryRestrictions}
              onChange={setDietaryRestrictions}
            />
            <GenerateButton
              onClick={handleGenerate}
              disabled={selectedIngredients.length === 0 || isLoading}
            />
          </div>
        </div>

        {/* Right Recipe Grid Area */}
        <div className="hidden lg:flex w-1/2 p-8 items-center">
          <RecipeGrid recipes={recipes} onOpenModal={handleOpenModal} />
        </div>
      </div>

      {/* Mobile Recipe Grid (below form) */}
      <div className="lg:hidden p-8">
        <RecipeGrid recipes={recipes} onOpenModal={handleOpenModal} />
      </div>

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}
      
      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;

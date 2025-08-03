import { useState } from "react";
import BrandHeader from "@/components/BrandHeader";
import HeroSection from "@/components/HeroSection";
import IngredientInput from "@/components/IngredientInput";
import DietaryRestrictions from "@/components/DietaryRestrictions";
import GenerateButton from "@/components/GenerateButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import RecipeGrid from "@/components/RecipeGrid";
import RecipeModal from "@/components/RecipeModal";
import { generateRecipes } from "@/services/AiService";

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
    try {
      const aiRecipes = await generateRecipes(selectedIngredients, dietaryRestrictions);
      setRecipes(aiRecipes);
    } catch (error) {
      console.log(error);
      setRecipes([]); // Optionally handle error, e.g., show a toast
    } finally {
      setIsLoading(false);
    }
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
        backgroundImage: `url('/lovable-uploads/BG-image.png')`
      }}
    >
      <div className="min-h-screen flex">
        {/* Left Content Area */}
        <div className="w-full lg:w-2/5 p-8 lg:pl-[8%] flex flex-col justify-center">
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
        <div className="hidden lg:flex w-3/5 h-1000px p-8 lg:pr-[8%] items-center">
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
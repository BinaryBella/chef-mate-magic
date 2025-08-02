import { useState } from "react";
import { Clock, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface RecipeCardProps {
  recipe: Recipe;
  onOpenModal: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onOpenModal }: RecipeCardProps) => {
  const [showSubstitutions, setShowSubstitutions] = useState(false);

  return (
    <div className="bg-card-bg hover:bg-card-hover rounded-lg p-6 transition-colors border border-light-gray shadow-lg">
      <h3 className="text-xl font-bold text-brand-text mb-2">{recipe.title}</h3>
      
      <div className="flex items-center gap-2 mb-3 text-gray-text">
        <Clock size={16} />
        <span>{recipe.prepTime}</span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-text mb-2">Ingredients:</p>
        <div className="flex flex-wrap gap-1">
          {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
            <span key={index} className="text-xs bg-white px-2 py-1 rounded-full text-brand-text border">
              {ingredient}
            </span>
          ))}
          {recipe.ingredients.length > 4 && (
            <span className="text-xs text-gray-text">+{recipe.ingredients.length - 4} more</span>
          )}
        </div>
      </div>
      
      <p className="text-gray-text text-sm mb-4 line-clamp-2">
        {recipe.instructions[0]}...
      </p>
           
      <Button
        onClick={() => onOpenModal(recipe)}
        className="w-full bg-brand-text hover:bg-brand-text/90 text-white rounded-lg"
      >
        Get Complete Recipe
      </Button>
    </div>
  );
};

export default RecipeCard;
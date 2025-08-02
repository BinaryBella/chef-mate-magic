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

  return (
    <div className="bg-card-bg hover:bg-card-hover rounded-lg p-6 transition-colors border border-light-gray shadow-lg flex flex-col h-full min-h-[400px] max-h-[400px]">
      <h3 className="text-xl font-bold text-brand-text mb-2 h-16 overflow-hidden line-clamp-2">{recipe.title}</h3>
      
      <div className="flex items-center gap-2 mb-3 text-gray-text">
        <Clock size={12} />
        <span className="text-sm">{recipe.prepTime}</span>
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
      
      <p className="text-gray-text text-sm mb-4 flex-grow overflow-hidden">
        {recipe.instructions.slice(0, 5).join('. ').slice(0, 150)}...
      </p>
            
      <Button
        onClick={() => onOpenModal(recipe)}
        className="w-full bg-brand-text hover:bg-brand-text/90 text-white rounded-lg mt-auto"
      >
        Get Complete Recipe
      </Button>
    </div>
  );
};

export default RecipeCard;
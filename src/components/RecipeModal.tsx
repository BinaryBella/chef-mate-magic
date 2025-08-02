import { X, Clock, Users, Star } from "lucide-react";
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

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-light-gray p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-brand-text">{recipe.title}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6">
          {/* Recipe Info */}
          <div className="flex items-center gap-6 mb-6 text-gray-text">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-brand-text mb-3">Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-brand-primary rounded-full mr-3 flex-shrink-0"></span>
                  <span className="text-brand-text">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-brand-text mb-3">Instructions</h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="bg-brand-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-brand-text">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Substitution Notes */}
          {recipe.substitutions && recipe.substitutions.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-3">Dietary Substitution Notes</h3>
              <div className="bg-substitution-bg rounded-lg p-4">
                {recipe.substitutions.map((sub, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    <span className="font-medium text-brand-text">{sub.original}</span>
                    <span className="text-gray-text"> → </span>
                    <span className="italic text-brand-text">{sub.alternative}</span>
                    <span className="text-gray-text text-sm"> ({sub.reason})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
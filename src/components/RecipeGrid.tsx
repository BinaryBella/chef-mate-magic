import RecipeCard from "./RecipeCard";

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

interface RecipeGridProps {
  recipes: Recipe[];
  onOpenModal: (recipe: Recipe) => void;
}

const RecipeGrid = ({ recipes, onOpenModal }: RecipeGridProps) => {
  if (recipes.length === 0) return null;

  return (
    <div className="w-full bg-white p-6 rounded-lg h-fit shadow-sm">
      <h3 className="text-2xl font-bold text-brand-text mb-6 text-center">Generated Recipes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;
// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import RecipeCard from "./RecipeCard";

// interface Recipe {
//   id: string;
//   title: string;
//   prepTime: string;
//   ingredients: string[];
//   instructions: string[];
//   difficulty: string;
//   servings: number;
//   substitutions?: { original: string; alternative: string; reason: string }[];
// }

// interface RecipeGridProps {
//   recipes: Recipe[];
//   onOpenModal: (recipe: Recipe) => void;
// }

// const RecipeGrid = ({ recipes, onOpenModal }: RecipeGridProps) => {
//   const [currentPage, setCurrentPage] = useState(0);
  
//   if (recipes.length === 0) return null;

//   const recipesPerPage = 3;
//   const totalPages = Math.ceil(recipes.length / recipesPerPage);
//   const currentRecipes = recipes.slice(
//     currentPage * recipesPerPage,
//     (currentPage + 1) * recipesPerPage
//   );

//   const goToNextPage = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="w-full bg-white p-6 rounded-lg h-fit shadow-sm">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-2xl font-bold">
//           <span className="text-black">Generated</span>{" "}
//           <span style={{ color: '#ed9e26' }}>Recipes</span>
//         </h3>
        
//         {/* Navigation Controls */}
//         {totalPages > 1 && (
//           <div className="flex items-center gap-2">
//             <button
//               onClick={goToPrevPage}
//               disabled={currentPage === 0}
//               className={`p-2 rounded-full border transition-colors ${
//                 currentPage === 0
//                   ? 'border-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'border-gray-300 text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <ChevronLeft size={20} />
//             </button>
            
//             <span className="text-sm text-gray-text min-w-[60px] text-center">
//               {currentPage + 1}/{totalPages}
//             </span>
            
//             <button
//               onClick={goToNextPage}
//               disabled={currentPage === totalPages - 1}
//               className={`p-2 rounded-full border transition-colors ${
//                 currentPage === totalPages - 1
//                   ? 'border-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'border-gray-300 text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               <ChevronRight size={20} />
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Recipe Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[300px]">
//         {currentRecipes.map((recipe) => (
//           <RecipeCard
//             key={recipe.id}
//             recipe={recipe}
//             onOpenModal={onOpenModal}
//           />
//         ))}
//       </div>
      
//       {/* Page Indicators */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 gap-2">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentPage
//                   ? 'bg-brand-text'
//                   : 'bg-gray-300 hover:bg-gray-400'
//               }`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeGrid;

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(0);
  
  if (recipes.length === 0) return null;

  const recipesPerPage = 3;
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const currentRecipes = recipes.slice(
    currentPage * recipesPerPage,
    (currentPage + 1) * recipesPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm flex flex-col h-[600px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">
          <span className="text-black">Generated</span>{" "}
          <span style={{ color: '#ed9e26' }}>Recipes</span>
        </h3>
        
        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full border transition-colors ${
                currentPage === 0
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className="text-sm text-gray-text min-w-[60px] text-center">
              {currentPage + 1}/{totalPages}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full border transition-colors ${
                currentPage === totalPages - 1
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
      
      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 flex-grow flex items-center">
        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
          {currentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
      
      {/* Page Indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentPage
                  ? 'bg-brand-text'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;
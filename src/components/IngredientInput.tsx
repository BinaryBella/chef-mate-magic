import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchQuickPickIngredients, IngredientCategory } from "@/services/openaiQuickPicks";

interface IngredientInputProps {
  selectedIngredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

const IngredientInput = ({ selectedIngredients, onIngredientsChange }: IngredientInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showQuickPick, setShowQuickPick] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [quickPickCategories, setQuickPickCategories] = useState<IngredientCategory[]>([]);
  const [quickPickLoading, setQuickPickLoading] = useState(true);

  useEffect(() => {
    fetchQuickPickIngredients()
      .then(setQuickPickCategories)
      .catch(() => setQuickPickCategories([]))
      .finally(() => setQuickPickLoading(false));
  }, []);

  const addIngredient = (ingredient: string) => {
    if (ingredient.trim() && !selectedIngredients.includes(ingredient.trim())) {
      onIngredientsChange([...selectedIngredients, ingredient.trim()]);
    }
  };

  const removeIngredient = (ingredient: string) => {
    onIngredientsChange(selectedIngredients.filter(item => item !== ingredient));
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addIngredient(inputValue);
      setInputValue("");
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleInputKeyPress}
            placeholder="Enter an ingredient, e.g., chicken, tomatoes..."
            className="w-full px-6 py-3 rounded-lg border-2 border-brand-primary focus:outline-none focus:border-brand-primary bg-white text-brand-text"
          ></textarea>
        </div>
        
        {/* Selected Ingredients Tags */}
        {selectedIngredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedIngredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-1 px-3 py-1 bg-brand-primary text-white rounded-full text-sm"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Quick Pick Section */}
      <div className="relative">
        <button
          onClick={() => setShowQuickPick(!showQuickPick)}
          className="flex items-center gap-2 text-brand-text font-medium hover:text-brand-primary transition-colors"
        >
          Quick Pick Ingredients
          <ChevronDown size={16} className={`transition-transform ${showQuickPick ? 'rotate-180' : ''}`} />
        </button>
        
        {showQuickPick && (
          <div className="mt-3 border border-light-gray rounded-lg bg-white p-4 shadow-sm">
            {quickPickLoading ? (
              <div>Loading quick picks...</div>
            ) : quickPickCategories.length === 0 ? (
              <div>Could not load quick picks.</div>
            ) : (
              quickPickCategories.map(({ category, items }) => (
                <div key={category} className="mb-3 last:mb-0">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center gap-2 font-medium text-brand-text hover:text-brand-primary mb-2"
                  >
                    <ChevronDown size={14} className={`transition-transform ${expandedCategories.includes(category) ? 'rotate-180' : ''}`} />
                    {category}
                  </button>
                  {expandedCategories.includes(category) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {items.map((item) => (
                        <Button
                          key={item}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => addIngredient(item)}
                          disabled={selectedIngredients.includes(item)}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientInput;
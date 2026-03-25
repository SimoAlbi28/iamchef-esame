import { ArrowRight } from "lucide-react";
import type { IngredientInterface } from "../../../../types/recipes";

type DiscoverRecipeBtnProps = {
  ingredients: IngredientInterface[],
  onSearchClick: () => void,
  isDiscover: boolean
}

const DiscoverRecipeBtn = ({ ingredients, onSearchClick, isDiscover }: DiscoverRecipeBtnProps) => {

    // Non mostrare il bottone se nessun ingrediente è selezionato
    if (!ingredients || ingredients.length === 0) return null;

    return (
        <button 
          className={`
            w-full flex justify-center items-center gap-1.5 py-2 px-3 
            rounded-lg font-semibold text-white text-center text-sm
            transition-all duration-300 shadow-md
            ${isDiscover 
              ? "bg-purple-500 cursor-default" 
              : "bg-purple-700 hover:bg-purple-800 active:bg-purple-900 cursor-pointer"}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          onClick={onSearchClick}
          disabled={isDiscover}
        >
            {isDiscover ? "Discovering..." : "Discover Recipes"} <ArrowRight size={16} />
        </button>
    );
}

export default DiscoverRecipeBtn;

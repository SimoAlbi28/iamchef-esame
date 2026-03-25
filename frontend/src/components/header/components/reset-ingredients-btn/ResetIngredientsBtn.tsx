import { RotateCcw } from "lucide-react";
import type { IngredientInterface } from "../../../../types/recipes";

type ResetIngredientsBtnProps = {
  ingredients: IngredientInterface[],
  onReset: () => void,
}

const ResetIngredientsBtn = ({ ingredients, onReset }: ResetIngredientsBtnProps) => {

    // Non mostrare il bottone se nessun ingrediente è selezionato
    if (!ingredients || ingredients.length === 0) return null;

    return (
        <button 
          className={`
            w-full flex justify-center items-center gap-1.5 py-2 px-3 
            rounded-lg font-semibold text-white text-center text-sm
            transition-all duration-300 shadow-md
            bg-red-600 hover:bg-red-700 active:bg-red-800 cursor-pointer
          `}
          onClick={onReset}
        >
            <RotateCcw size={16} /> Reset 
        </button>
    );
}

export default ResetIngredientsBtn;

import { X } from "lucide-react";
import type { IngredientInterface } from "../../../../types/recipes";

type SelectedIngredientProps = {
    id: string,
    ingredient: IngredientInterface,
    handleRemove: (ing: IngredientInterface) => void
}

// Badge ingrediente a tema violetto
const SelectedIngredient = ({ id, ingredient, handleRemove }: SelectedIngredientProps) => {
    return (
        <span
          id={id}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-wrap rounded-full 
                     bg-purple-100 text-purple-800 text-sm font-medium shadow-sm 
                     hover:bg-purple-200 transition-colors`}
        >
          {/* Nome ingrediente */}
          {ingredient.name}

          {/* Bottone rimozione */}
          <button
            onClick={() => handleRemove(ingredient)}
            className="hover:bg-purple-300 rounded-full p-0.5 transition-colors cursor-pointer"
            aria-label={`Rimuovi ${ingredient.name}`}
          >
            <X size={14} className="stroke-[2.5]" />
          </button>
        </span>
    );
};

export default SelectedIngredient;

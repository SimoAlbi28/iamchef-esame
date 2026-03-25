import type { IngredientInterface } from "../../types/recipes";

// Puoi anche aggiungere la preview dei primi 2-3 ingredienti
export const RecipeIngredients = ({ extendedIngredients }: { extendedIngredients: IngredientInterface[] }) => {
  const primi = extendedIngredients?.slice(0, 3).map(i => i.name).join(", ");
  const pochi = extendedIngredients?.length <= 5;

  return (
    <div className="my-1">
      {primi && (
        <div className="text-sm italic text-green-900/70 mb-1">
          <span className="font-medium">Ingredienti chiave:</span> {primi}
        </div>
      )}
      {pochi && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold shadow-sm">
          <span role="img" aria-label="pochi ingredienti">🧂</span>
          Pochi ingredienti
        </span>
      )}
    </div>
  );
};

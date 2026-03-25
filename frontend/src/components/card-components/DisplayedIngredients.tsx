import type { IngredientInterface } from "../../types/recipes"

type DisplayedIngredientsProps = {
    displayedIngredients: IngredientInterface[]
}
const DisplayedIngredients = ({displayedIngredients}: DisplayedIngredientsProps) => {
  return (
    <section className="flex flex-col gap-1 shrink-0">
        <h2 className="text-sm font-bold text-green-700">Ingredienti principali</h2>
        <ul className="space-y-1">
        {displayedIngredients.map((ing) => (
            <li key={ing.id} className="flex items-center justify-between text-green-900 bg-green-50 rounded-lg py-1.5 px-2 shadow text-xs">
            <span className="font-semibold truncate flex-1 mr-2">{ing.name || "Ingrediente"}</span>
            <span className="text-green-700 font-medium shrink-0 whitespace-nowrap">
                {ing.measures?.metric?.amount ?? "-"}{ing.measures?.metric?.unitShort ?? ""}
            </span>
            </li>
        ))}
        </ul>
    </section>
  )
}

export default DisplayedIngredients
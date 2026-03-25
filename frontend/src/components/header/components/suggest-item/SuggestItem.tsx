import type { IngredientInterface } from "../../../../types/recipes"

type SuggestItemProps ={
    ingredient: IngredientInterface,
    handleClick: (ing: IngredientInterface) => void
}

const SuggestItem = ({ ingredient, handleClick }: SuggestItemProps) => {
  return (
    <div
      onClick={() => handleClick(ingredient)} 
      className="bg-white text-black rounded-lg p-2 cursor-pointer">
        <h1>{ingredient.name}</h1>
    </div>
  )
}

export default SuggestItem
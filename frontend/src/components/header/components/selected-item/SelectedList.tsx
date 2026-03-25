import type { IngredientInterface } from "../../../../types/recipes"
import SelectedItem from "./SelectedItem"

type SelectedListProps = {
    // Array degli ingredienti selezionati da visualizzare
    ingredients: IngredientInterface[],
    // Callback richiamata quando l'utente clicca il bottone di rimozione di un ingrediente
    handleRemove: (ing: IngredientInterface) => void
}

const SelectedList = ({ ingredients, handleRemove }: SelectedListProps) => {
  // ========== COMPONENTE SELECTED LIST ==========
  // Mostra la lista degli ingredienti selezionati come badge wrappati
  // Ogni badge ha un bottone X per la rimozione
  
  return (
    <div className={`max-h-40 flex flex-wrap gap-2 overflow-y-auto rounded-lg pr-2 content-start`}>
    {/* Mappa ogni ingrediente a un componente SelectedItem */}
    {ingredients.map((ingredient, index) => (
        <SelectedItem 
            key={index.toString()}
            id={index.toString()} 
            ingredient={ingredient} 
            handleRemove={handleRemove}/>
    ))}
    </div>

  )
}

export default SelectedList
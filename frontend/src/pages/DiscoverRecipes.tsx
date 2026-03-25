import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RecipeCard } from "../components/card-components/RecipeCard"
import { ScrollBtnSection } from "../components/scroll-btn/ScrollBtnSection"
import { useRecipesStore } from "../store/recipesStore"
import type { RecipeInterface } from "../types/recipes"

function DiscoverRecipes() {
  // ========== ROUTING & NAVIGATION ==========
  // useNavigate() - Hook di React Router per navigazione programmatica
  // Permette di navigare tra le pagine senza props callback
  // Sostituisce: onRecipeDetailClick e goToHomepage che erano passate come props
  const navigate = useNavigate();
  
  // ========== ZUSTAND STORE (SOSTITUZIONE PROPS) ==========
  // useRecipesStore() - Legge le ricette dallo store globale
  // Prima le ricette arrivavano come prop: recipes: RecipeInterface[]
  // Ora le ricette sono state salvate in SearchPage con setRecipes()
  // e vengono lette qui direttamente dallo store
  const { recipes } = useRecipesStore();
  
  // ========== STATO LOCALE ==========
  // currentIndex - Gestito come stato locale perché è specifico di questa pagina
  // Indica quale ricetta del carosello è attualmente visibile (0, 1, 2, ...)
  // Prima veniva passato come prop da App.tsx insieme a setCurrentIndex
  // Ora è completamente interno alla pagina
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // ========== HANDLERS ==========
  // ========== HANDLERS DI NAVIGAZIONE ==========
  
  /**
   * handleRecipeDetailClick - Naviga alla pagina di dettaglio
   * @param recipe - Ricetta selezionata dall'utente
   * 
   * ROUTING:
   * - Usa navigate() per passare a /recipe/:id
   * - L'id viene inserito dinamicamente nell'URL
   * - RecipeDetails leggerà l'id con useParams() dall'URL
   * - Esempio: se recipe.id = 123 → naviga a /recipe/123
   * 
   * VECCHIO SISTEMA:
   * - Prima si chiamava onRecipeDetailClick(recipe.id) passata come prop
   * - App.tsx gestiva il cambio di pagina con setPage('recipeDetails')
   * - L'id veniva salvato in uno stato e passato come prop
   * 
   * NUOVO SISTEMA:
   * - L'id è nell'URL: /recipe/:id
   * - RecipeDetails usa useParams() per leggerlo
   * - Niente props, niente state management complesso
   * - URL come unica fonte di verità
   */
  const handleRecipeDetailClick = (recipe: RecipeInterface) => {
    navigate(`/recipe/${recipe.id}`);
  };

  /**
   * goToHomepage - Torna alla pagina di ricerca ingredienti
   * 
   * ROUTING:
   * - Usa navigate('/search') per tornare alla SearchPage
   * - Mantiene gli ingredienti salvati nello store
   * - L'utente può modificare la selezione e rifare la ricerca
   * 
   * VECCHIO SISTEMA:
   * - Prima si chiamava goToHomepage() passata come prop
   * - App.tsx faceva setPage('searchPage')
   * 
   * NUOVO SISTEMA:
   * - navigate('/search') cambia URL e monta SearchPage
   * - Gli ingredienti restano in recipesStore (non vengono persi)
   * - Più intuitivo per l'utente (può usare anche il pulsante back del browser)
   */
  const goToHomepage = () => {
    navigate('/search');
  };
  // ========== COMPONENTE DISCOVER RECIPES ==========
  // Questo componente mostra un carosello di ricette
  // 
  // Struttura:
  // 1. Area scrollabile in alto: mostra la ricetta attualmente selezionata
  // 2. Area bottoni in basso: permette di navigare tra le ricette
  //
  // Flusso:
  // - L'utente vede la prima ricetta della lista (indice 0)
  // - Può scorrere in alto per leggere tutti i dettagli della ricetta
  // - Può cliccare i bottoni in basso per navigare alle ricette precedente/successiva
  // - Può cliccare "View Details" per andare alla pagina completa della ricetta

  return (
    <main
      id="recipe-card-container"
      className="w-full h-full flex flex-col gap-0 overflow-hidden min-h-0"
    >

      {/* SEZIONE 1: Area scrollabile con la ricetta corrente */}
      {/* flex-1 significa che usa tutto lo spazio disponibile */}
      {/* min-h-0 è necessario per far funzionare correttamente il flex layout */}
      {/* overflow-y-auto permette di scrollare se il contenuto è troppo lungo */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-4 py-4">
          {/* RecipeCard: mostra titolo, tempo, ingredienti, immagine della ricetta */}
          {/* recipes[currentIndex] seleziona la ricetta in base all'indice corrente */}
          {/* onClickDetails è il callback quando l'utente clicca "View Details" */}
          {recipes.length > 0 && (
            <RecipeCard recipe={recipes[currentIndex]} onClickDetails={handleRecipeDetailClick} />
          )}
        </div>
      </div>

      {/* SEZIONE 2: Area bottoni per la navigazione */}
      {/* shrink-0 significa che questa sezione non si riduce (rimane sempre visibile) */}
      <div className="shrink-0">
        {/* ScrollBtnSection: contiene i bottoni per navigare tra le ricette */}
        <ScrollBtnSection
          currentIndex={currentIndex}
          maxIndex={recipes.length-1}
          setCurrentIndex={setCurrentIndex}
          goToHomepage={goToHomepage}
        />
      </div>

    </main>
  )
}

export default DiscoverRecipes

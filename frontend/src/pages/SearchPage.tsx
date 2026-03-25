import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import SearchBar from "../components/header/components/search-bar/Searchbar"
import SelectedList from "../components/header/components/selected-item/SelectedList"
import DiscoverRecipeBtn from "../components/header/components/discover-recipes-btn/DiscoverRecipeBtn"
import ResetIngredientsBtn from "../components/header/components/reset-ingredients-btn/ResetIngredientsBtn"
import { useRecipesStore } from "../store/recipesStore"
import { getRecipesURL } from "../hooks/useApi"
import { fetchJson, getApiBaseUrl } from "../utils/api"

const SearchPage = () => {
    // ========== ROUTING & NAVIGATION ==========
    // useNavigate() - Hook di React Router per navigazione programmatica
    // Dopo aver fetchato le ricette, naviga alla pagina /discover per mostrarle
    // Sostituisce il setCurrentPage({page: 'discover-recipes'}) che era in App.tsx
    const navigate = useNavigate();
    
    // Ref per accedere ai metodi della SearchBar dall'esterno
    // Permette di resettare il testo e chiudere i suggerimenti quando si clicca "Reset"
    const searchBarRef = useRef<{ reset: () => void }>(null);
    
    // ========== ZUSTAND STORES (SOSTITUZIONE PROPS) ==========
    // Prima questi dati arrivavano come props da App.tsx
    // Ora vengono letti direttamente dagli store globali Zustand
    //
    // useRecipesStore() - Store per ingredienti e ricette
    // - selectedIngredients: array ingredienti selezionati (era selectedIng prop)
    // - addIngredient: aggiunge un ingrediente (era onSuggestClick prop)
    // - removeIngredient: rimuove un ingrediente (era onBadgeRemove prop)
    // - resetIngredients: pulisce tutti gli ingredienti (era onResetClick prop)
    // - setRecipes: salva le ricette fetchate nello store
    // - isLoading: flag per mostrare "Discovering..." (era isDiscover prop)
    // - setIsLoading: setta il flag di loading
    const { selectedIngredients, addIngredient, removeIngredient, resetIngredients, setRecipes, isLoading, setIsLoading } = useRecipesStore();
    
    // ========== HANDLER RICERCA (SOSTITUZIONE handleSearchClick in App.tsx) ==========
    // Prima questa logica era in App.tsx e veniva passata come prop onSearchClick
    // Ora è internamente gestita da SearchPage - la pagina è autoconsistente
    //
    // FLUSSO:
    // 1. Verifica che ci siano ingredienti selezionati
    // 2. Setta isLoading = true (mostra "Discovering...")
    // 3. Costruisce l'URL usando getRecipesURL()
    // 4. Fetcha le ricette dall'endpoint /recipes/findByIngredients
    // 5. Normalizza la risposta (può essere array o oggetto con 'results')
    // 6. Se mancano metadati (readyInMinutes), fetcha i dettagli in parallelo
    // 7. Salva le ricette nello store con setRecipes()
    // 8. Naviga a /discover per mostrare il carosello
    const handleSearchClick = async () => {
      if (selectedIngredients.length === 0) return;
      
      setIsLoading(true);
      
      try {
        const ingredientNames = selectedIngredients.map(ing => ing.name).join(", ");
        const url = getRecipesURL(ingredientNames);
        
        if (!url) {
          console.error("URL non valido");
          setIsLoading(false);
          return;
        }

        const json = await fetchJson<any>(url);

        // Normalizza le risposte: può essere un array (findByIngredients) o un oggetto con `results`
        let recipesData = [];
        if (Array.isArray(json)) {
          recipesData = json;
        } else if (json && typeof json === 'object' && 'results' in json) {
          recipesData = json.results;
        } else {
          recipesData = json;
        }

        // Fetch dettagli ricette se necessario (in parallelo)
        if (recipesData && recipesData.length > 0 && !recipesData[0].readyInMinutes) {
          const baseUrl = getApiBaseUrl();
          const detailsPromises = recipesData.map((recipe: any) =>
            fetchJson<any>(`${baseUrl}/recipes/${recipe.id}`)
              .catch(() => null)
          );
          
          const detailedRecipes = await Promise.all(detailsPromises);
          recipesData = recipesData.map((recipe: any, idx: number) => {
            const details = detailedRecipes[idx];
            return details ? { ...recipe, ...details } : recipe;
          });
        }

        // Salva le ricette nello store Zustand (condiviso con DiscoverRecipes)
        setRecipes(recipesData || []);
        
        // ========== NAVIGAZIONE DOPO FETCH ==========
        // Naviga alla pagina /discover che leggerà le ricette dallo store
        // Sostituisce: setCurrentPage({ currentPage: { page: 'discover-recipes' } })
        navigate('/discover');
      } catch (err) {
        console.error('Fetch recipes error', err);
      } finally {
        setIsLoading(false);
      }
    };

    // ========== HANDLER RESET ==========
    const handleResetAll = () => {
      searchBarRef.current?.reset();
      resetIngredients();
    };
    return (
        <div className="w-full flex flex-col items-center p-4 bg-gradient-to-b from-purple-100 via-white to-purple-200">
            
            {/* Card principale - Container per tutti gli elementi */}
            <div className="flex flex-col gap-4 w-full max-w-md bg-white/100 backdrop-blur-lg rounded-3xl shadow-xl p-5">
                
                {/* SEZIONE 1: Titolo */}
                <p className="text-purple-800 font-bold text-lg text-center tracking-tight">
                    🧩 Ingredienti per la ricetta
                </p>
                
                {/* SEZIONE 2: Barra di ricerca */}
                {/* Permette all'utente di cercare e selezionare ingredienti */}
                {/* Mostra la tendina con i suggerimenti quando l'utente digita */}
                <div className="relative rounded-xl border border-purple-300 focus-within:ring-4 focus-within:ring-purple-200">
                  <SearchBar ref={searchBarRef} handleSuggestClick={addIngredient} />
                </div>

                {/* SEZIONE 3: Lista ingredienti selezionati */}
                {/* Mostra gli ingredienti già selezionati come badge piccoli */}
                {/* Ogni badge ha una X per rimuovere l'ingrediente */}
                {/* Se ci sono più di 4 righe di ingredienti, si può scrollare */}
                <div className="mt-1">
                  <SelectedList 
                      ingredients={selectedIngredients} 
                      handleRemove={removeIngredient}
                  />
                </div>

                {/* SEZIONE 4: Bottone "Discover Recipes" */}
                {/* Appare solo se almeno un ingrediente è selezionato */}
                {/* Al click, costruisce l'URL e fetcha le ricette dall'API */}
                {/* Mostra "Discovering..." mentre la ricerca è in corso */}
                <div className="mt-2 w-full">
                  <DiscoverRecipeBtn 
                      ingredients={selectedIngredients} 
                      onSearchClick={handleSearchClick} 
                      isDiscover={isLoading}
                  />
                </div>

                {/* SEZIONE 5: Bottone "Reset Ingredients" */}
                {/* Appare solo se almeno un ingrediente è selezionato */}
                {/* Al click: pulisce il testo della searchbar, chiude i suggerimenti, cancella gli ingredienti */}
                <div className="w-full">
                  <ResetIngredientsBtn 
                      ingredients={selectedIngredients}
                      onReset={handleResetAll}
                  />
                </div>

            </div>
        </div>
    )
}

export default SearchPage

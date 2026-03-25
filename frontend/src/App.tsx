import type { RecipeInterface, IngredientInterface } from "./types/recipes";
import type { currentPage } from './types/pages.ts'
import { useState, useEffect } from 'react'
import DiscoverRecipes from './pages/DiscoverRecipes.tsx'
import RecipeDetails from './pages/RecipeDetails.tsx'
import SearchPage from './pages/SearchPage.tsx'
import Layout from "./components/layout/Layout"
import Header from './components/header/Header'
import Footer from './components/Footer'
import Intropage from "./pages/Intropage.tsx"
import { getRecipesURL } from "./hooks/useApi.ts";
import { useApiConfigStore } from "./store/apiConfigStore.ts";

function App() {
  // ========== STATI GLOBALI ==========
  // Gestisce la pagina attualmente visualizzata (homepage, discover-recipes, recipe-details)
  // Inizializza nella pagina Intropage dove l'utente inserisce l'API key
  const [currentPage, setCurrentPage] = useState<currentPage>({currentPage: {page: "Intropage"}})
  
  // Array degli ingredienti selezionati dall'utente tramite la searchbar
  // Quando l'utente clicca su un suggerimento nella searchbar, viene aggiunto qui
  // Viene azzerato dal bottone "Reset"
  const [selectedIng, setSelectedIng] = useState<IngredientInterface[]>([])
  
  // Array di ricette ottenuto dall'API di Spoonacular
  // Viene riempito quando l'utente clicca "Discover Recipes" dopo aver selezionato ingredienti
  // Viene usato nel carosello per mostrare tutte le ricette trovate
  const [recipes, setRecipes] = useState<RecipeInterface[]>([])
  
  // Indice attuale della ricetta visualizzata nel carosello di discover-recipes
  // Aumenta/diminuisce quando l'utente clicca i bottoni di navigazione
  // Viene resettato a 0 quando si fa una nuova ricerca
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  
  // Flag per indicare se la ricerca è in corso
  // Quando true, mostra "Discovering..." nel bottone e disabilita i click
  // Viene settato a false quando la fetch termina (sia con successo che con errore)
  const [isDiscover, setIsDiscover] = useState<boolean>(false)

  // ========== API / URLS ==========
  // URL completo per la ricerca delle ricette da Spoonacular
  // Viene costruito in handleSearchClick usando getRecipesURL()
  // Es: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=tomato,mozzarella&apiKey=..."
  const [URL, setURL] = useState<string>("")
  
  // Flag che abilita la fetch delle ricette quando diventa true
  // Questo meccanismo evita chiamate automatiche non volute alla API
  // La fetch parte SOLO quando handleSearchClick setta questo a true
  const [recipesFetchEnabled, setRecipesFetchEnabled] = useState<boolean>(false)
  
  // API Key dal Zustand store - letta dal localStorage
  // Viene salvata nella pagina Intropage tramite validateApiKey
  const { token: apiKey } = useApiConfigStore()
  // ========== EFFETTO PRINCIPALE: FETCH RICETTE ==========
  // Questo useEffect si attiva quando:
  // 1. recipesFetchEnabled diventa true (settato da handleSearchClick)
  // 2. URL viene impostato (costruito da getRecipesURL)
  // 3. apiKey cambia
  
  // Quello che fa:
  // 1. Fa il fetch all'endpoint /recipes/findByIngredients con gli ingredienti selezionati
  // 2. Normalizza la risposta (può essere array o oggetto con field 'results')
  // 3. Se le ricette non hanno 'readyInMinutes', fetcha i dettagli per ogni ricetta in parallelo
  //    usando l'endpoint /recipes/{id}/information per aggiungere metadati (tempo, porzioni, tipi piatto)
  // 4. Mergia i dettagli con i dati iniziali della ricetta
  // 5. Salva tutte le ricette in state e naviga a discover-recipes
  // 6. Gestisce gli errori con try/catch
  // 7. Alla fine sempre resetta isDiscover e recipesFetchEnabled
  useEffect(() => {
    let cancelled = false

    const fetchRecipes = async () => {
      // Se la fetch non è abilitata o URL è vuoto, esce
      if (!recipesFetchEnabled || !URL) return
      try {
        setIsDiscover(true)
        // Fetcha l'URL (che è l'endpoint findByIngredients)
        const res = await fetch(URL)
        const json = await res.json()

        // Se il componente è stato smontato nel frattempo, esce
        if (cancelled) return

        // ========== NORMALIZZAZIONE RISPOSTA ==========
        // L'API di Spoonacular può ritornare:
        // - Un array direttamente: [{ id: 1, title: "..." }, ...]
        // - Un oggetto con field 'results': { results: [{ id: 1, ... }] }
        // - In rari casi, un singolo oggetto
        let recipesData: RecipeInterface[] = []
        if (Array.isArray(json)) {
          // Caso 1: risposta è un array direttamente
          recipesData = json as unknown as RecipeInterface[]
        } else if (json && typeof json === 'object' && 'results' in json) {
          // Caso 2: risposta è un oggetto con field 'results'
          // @ts-ignore
          recipesData = json.results
        } else {
          // Caso 3: fallback - prova ad assegnare l'oggetto direttamente
          recipesData = json as RecipeInterface[]
        }

        // ========== FETCH DETTAGLI RICETTE (PARALLELO) ==========
        // Se il risultato viene da findByIngredients, le ricette non hanno tutti i metadati
        // Controlliamo se la prima ricetta NON ha 'readyInMinutes'
        // Se manca, facciamo un fetch per ogni ricetta all'endpoint /recipes/{id}/information
        if (recipesData && recipesData.length > 0 && !recipesData[0].readyInMinutes) {
          // Costruisce array di Promise per tutti i dettagli
          const baseUrl = import.meta.env.VITE_BASE_URL
          const detailsPromises = recipesData.map((recipe: any) =>
            // Fetcha i dettagli di ogni ricetta
            // includeNutrition=false per risparmiare crediti API
            fetch(`${baseUrl}/recipes/${recipe.id}/information?apiKey=${apiKey ?? ""}&includeNutrition=false`)
              // Se il fetch è ok, parsea il JSON, altrimenti ritorna null
              .then(res => res.ok ? res.json() : null)
              // Se c'è un errore di rete, ritorna null (non blocca tutto)
              .catch(() => null)
          )
          
          // Aspetta che tutti i fetch siano completati
          const detailedRecipes = await Promise.all(detailsPromises)
          
          // Mergia i dettagli con i dati iniziali
          // Per ogni ricetta, se abbiamo i dettagli, li mergiamo, altrimenti teniamo i dati originali
          recipesData = recipesData.map((recipe: any, idx: number) => {
            const details = detailedRecipes[idx]
            // Se details non è null, mergia con spread operator
            return details ? { ...recipe, ...details } : recipe
          })
        }

        // Salva tutte le ricette in state
        setRecipes(recipesData || [])
        // Naviga alla pagina discover-recipes per mostrare il carosello
        setCurrentPage({ currentPage: { page: 'discover-recipes' } })
      } catch (err) {
        // Stampa l'errore in console
        console.error('Fetch recipes error', err)
      } finally {
        // Sempre eseguito alla fine, indipendentemente da successo o errore
        if (!cancelled) {
          // Spegni il flag di loading
          setIsDiscover(false)
          // Spegni il flag che attiva la fetch (così non refetcha automaticamente)
          setRecipesFetchEnabled(false)
        }
      }
    }

    fetchRecipes()

    // Cleanup: se il componente si smonta, settiamo cancelled a true
    // Questo previene memory leak e aggiornamenti di state su componente smontato
    return () => { cancelled = true }
  }, [recipesFetchEnabled, URL, apiKey])

  // NOTE: non costruiamo l'URL automaticamente quando cambia selectedIng
  // La fetch deve partire SOLO al click su Discover (handleSearchClick)

  // ========== HANDLER PER LA RICERCA ==========
  // Viene richiamato quando l'utente clicca il bottone "Discover Recipes"
  // 
  // Flusso:
  // 1. Setta isDiscover = true per mostrare "Discovering..." nel bottone
  // 2. Resetta currentIndex = 0 (mostrerà la prima ricetta del carosello)
  // 3. Estrae i nomi degli ingredienti selezionati e li unisce con virgola (es: "tomato,mozzarella")
  // 4. Costruisce l'URL usando getRecipesURL() che crea l'endpoint findByIngredients
  // 5. Verifica che l'URL sia valido (se manca baseUrl o apiKey, mostra errore)
  // 6. Setta recipesFetchEnabled = true (attiva l'useEffect che fa il fetch)
  // 7. Setta l'URL
  // 
  // Note: L'useEffect sopra sta ascoltando recipesFetchEnabled e URL
  //       Quando entrambi sono settati, il fetch parte automaticamente
  const handleSearchClick = () => {
    setIsDiscover(true)
    setCurrentIndex(0)

    const ingredientNames = selectedIng.map(ing => ing.name).join(", ")
    console.log("Ingredienti selezionati:", ingredientNames)

    const url = getRecipesURL(ingredientNames)
    console.log("URL generato:", url)
    
    if (!url) {
      console.error("URL non valido - verifica baseUrl e apiKey")
      setIsDiscover(false)
      return
    }

    // Abilita la fetch e imposta l'URL: l'useEffect sopra effettuerà la chiamata
    setRecipesFetchEnabled(true)
    setURL(url)
  }

  // ========== HANDLER PER INGREDIENTI ==========
  // Aggiunge un ingrediente alla lista degli ingredienti selezionati
  // Viene richiamato quando l'utente clicca su un suggerimento nella searchbar
  //
  // Flusso:
  // 1. Controlla se l'ingrediente è già presente nell'array selectedIng
  // 2. Se esiste già, esce senza fare nulla (evita duplicati)
  // 3. Se non esiste, aggiunge l'ingrediente in fondo all'array
  const handleSuggestClick = (ingredient: IngredientInterface) => {
    if (selectedIng.includes(ingredient)) {
      return null
    }
    setSelectedIng(prev => [...prev, ingredient])
  }

  // Rimuove un ingrediente dalla lista degli ingredienti selezionati
  // Viene richiamato quando l'utente clicca la X su un badge ingrediente
  //
  // Flusso:
  // 1. Filtra l'array selectedIng per mantenere solo gli ingredienti che NON sono quello cliccato
  // 2. Se l'ingrediente era l'ultimo, la lista diventa vuota
  const handleSuggestRemove = (ingredient: IngredientInterface) => {
    setSelectedIng(selectedIng.filter(tag => tag != ingredient))
  }

  // Resetta tutti gli ingredienti selezionati
  // Viene richiamato quando l'utente clicca il bottone "Reset"
  //
  // Flusso:
  // 1. Setta selectedIng a array vuoto
  // 2. Questo triggera il re-render del componente
  // 3. La SearchBar riceverà questa callback e pulirà anche il testo della barra
  const handleResetIngredients = () => {
    setSelectedIng([])
  }

  // ========== HANDLER PER LA NAVIGAZIONE ==========
  // Naviga alla pagina dei dettagli della ricetta selezionata
  // Viene richiamato quando l'utente clicca "View Details" su una ricetta card
  //
  // Flusso:
  // 1. Trova l'indice della ricetta cliccata nell'array recipes
  // 2. Setta currentIndex a questo indice (così la carta selezionata rimane coerente)
  // 3. Naviga a recipe-details passando i dati della ricetta
  const handleRecipeDetailClick = (recipe:RecipeInterface) => {
    // ensure currentIndex matches the clicked recipe so RecipeDetails shows correct id
    const idx = recipes.findIndex(r => r?.id === recipe?.id)
    if (idx >= 0) setCurrentIndex(idx)
    setCurrentPage({currentPage: {page: "recipe-details", recipeData: recipe}, id: idx >= 0 ? idx : undefined});
  }

  // Torna alla pagina SearchPage (da qualsiasi altro punto)
  // Viene richiamato quando l'utente clicca il logo nella pagina discover-recipes
  const goToHomepage = () => {
    setCurrentPage({currentPage: {page: "SearchPage"}});
  }

  // Torna alla pagina discover-recipes mantenendo l'indice della ricetta precedentemente visualizzata
  // Viene richiamato quando l'utente clicca "Go Back" dalla pagina recipe-details
  //
  // Flusso:
  // 1. Naviga a discover-recipes
  // 2. Mantiene l'ID della ricetta che era stata selezionata (così tornerà alla stessa posizione nel carosello)
  const handleClickBack = (id:number) => {
    setCurrentPage({
      currentPage: {page: 'discover-recipes'},
      id: id
    })
  }

  // ========== NOTA IMPORTANTE: ROUTING MIGRATO A REACT ROUTER ==========
  // 
  // Lo switch case qui sotto è DEPRECATO e non viene usato
  // 
  // Il routing è stato completamente migrato a React Router in /src/router.tsx
  // main.tsx usa RouterProvider per renderizzare le rotte definite in router.tsx
  // 
  // Ogni pagina è ora autoconsistente:
  // - Legge i parametri dall'URL con useParams()
  // - Naviga usando useNavigate()
  // - Accede allo stato globale con Zustand stores (apiConfigStore, recipesStore)
  // 
  // Rotte definite in router.tsx:
  // - / → Intropage (API key setup)
  // - /search → SearchPage (ingredient selection)
  // - /discover → DiscoverRecipes (recipe carousel)
  // - /recipe/:id → RecipeDetails (dynamic recipe detail page)
  // 
  // App.tsx è mantenuto come RIFERIMENTO del vecchio sistema (prima di React Router)
  // ============================================================================

  // ========== VECCHIO SISTEMA (DEPRECATO) - NON USATO ==========
  let mainContent = null;

  switch (currentPage.currentPage.page) {
    // Pagina 1: Setup API key
    // Mostra il form per inserire l'API key di Spoonacular
    // Quando salvato, naviga a SearchPage
    case "Intropage":
      // @ts-ignore - Intropage ora usa React Router (useNavigate), non accetta onApiKeySaved prop
      mainContent = <Intropage onApiKeySaved={() => setCurrentPage({currentPage: {page: "SearchPage"}})} />;
      break;
    
    // Pagina 2: Carosello di ricette
    // Mostra le ricette trovate in un carosello con bottoni di navigazione
    // Ha il bottone "View Details" per andare ai dettagli di ogni ricetta
    case "discover-recipes":
      // @ts-ignore - DiscoverRecipes ora usa React Router (useNavigate) e Zustand store
      mainContent = <DiscoverRecipes setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} recipes={recipes} onRecipeDetailClick={handleRecipeDetailClick} goToHomepage={goToHomepage}/> 
      break;
    
    // Pagina 3: Dettagli ricetta
    // Mostra tutti i dettagli della ricetta: ingredienti, calorie, vino, etc.
    // Ha il bottone "Go Back" per tornare al carosello
    case "recipe-details":
      // @ts-ignore - RecipeDetails ora usa React Router (useParams), non accetta id e recipeData props
      mainContent = <RecipeDetails id={currentIndex} goToBack={handleClickBack} recipeData={currentPage.currentPage.recipeData!}/>
      break;
    
    // Default: Pagina ricerca ingredienti
    // Mostra la searchbar, lista ingredienti selezionati, bottoni Discover e Reset
    // Questa è la pagina principale dove l'utente cerca ingredienti
    default:
      // @ts-ignore - SearchPage ora usa React Router (useNavigate) e Zustand store
      mainContent = <SearchPage onSuggestClick={handleSuggestClick} onBadgeRemove={handleSuggestRemove} selectedIng={selectedIng} onSearchClick={handleSearchClick} onResetClick={handleResetIngredients} isDiscover={isDiscover}/>
      break;
  }
  // ============================================================================
  
  // ========== RENDER ==========
  return (<Layout 
      header={<Header />}
      // @ts-ignore - Layout ora usa React Router (Outlet), non accetta main prop
      main={mainContent}
      footer={<Footer />}
  /> as any)
}

export default App

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import Intropage from "./pages/Intropage";
import SearchPage from "./pages/SearchPage";
import DiscoverRecipes from "./pages/DiscoverRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import AuthGuard from "./components/AuthGuard";

// ========== ROUTER CONFIGURATION ==========
// Questo file definisce la struttura di routing dell'intera applicazione
// Usa React Router v6+ con createBrowserRouter per la navigazione
//
// VANTAGGI DEL ROUTING:
// 1. Ogni pagina ha un URL univoco e condivisibile
// 2. Il browser history funziona (avanti/indietro)
// 3. Deep linking: puoi aprire direttamente /recipe/123
// 4. Le pagine sono indipendenti e autoconsistenti
// 5. Non serve più props drilling tra i componenti
//
// GESTIONE DELLO STATO:
// - Dati globali: Zustand store (recipesStore, apiConfigStore)
// - Dati dalla URL: useParams() per parametri dinamici come :id
// - Navigazione: useNavigate() per cambiare rotta programmaticamente

export const router = createBrowserRouter([
  {
    // ========== LAYOUT PRINCIPALE ==========
    // Tutte le rotte figlie condividono questo layout
    // Layout include Header (logo) e Footer (fissi su tutte le pagine)
    // Il contenuto centrale cambia in base alla rotta tramite <Outlet />
    path: "/",
    element: (
      <Layout 
        header={<Header />}
        footer={<Footer />}
      />
    ),
    children: [
      {
        // ========== ROTTA 1: HOME / SETUP API KEY ==========
        // URL: http://localhost:5173/
        // 
        // COSA FA:
        // - Prima pagina che l'utente vede
        // - Form per inserire l'API key di Spoonacular
        // - Valida la key con una chiamata di test
        // - Salva la key nello store Zustand (persiste in localStorage)
        // 
        // NAVIGAZIONE:
        // - Dopo salvataggio key → navigate('/search')
        //
        // DATI:
        // - apiKey salvata in: useApiConfigStore()
        path: "/",
        element: <Intropage />,
      },
      {
        // ========== ROTTA 2: RICERCA INGREDIENTI ==========
        // URL: http://localhost:5173/search
        //
        // COSA FA:
        // - Searchbar per cercare ingredienti
        // - Mostra suggerimenti in tempo reale dall'API
        // - Lista degli ingredienti selezionati (badge con X per rimuovere)
        // - Bottone "Discover Recipes" per avviare la ricerca
        // - Bottone "Reset" per pulire tutto
        //
        // NAVIGAZIONE:
        // - Dopo click "Discover" → fetcha le ricette → navigate('/discover')
        //
        // DATI:
        // - Ingredienti selezionati in: useRecipesStore().selectedIngredients
        // - Ricette salvate in: useRecipesStore().recipes
        path: "/search",
        element: <AuthGuard><SearchPage /></AuthGuard>,
      },
      {
        // ========== ROTTA 3: CAROSELLO RICETTE ==========
        // URL: http://localhost:5173/discover
        //
        // COSA FA:
        // - Mostra le ricette trovate in un carosello scrollabile
        // - Bottoni per navigare tra le ricette (prev/next)
        // - Ogni ricetta mostra: immagine, titolo, tempo, ingredienti
        // - Bottone "View Details" per vedere tutti i dettagli
        // - Bottone logo per tornare alla ricerca
        //
        // NAVIGAZIONE:
        // - Click "View Details" → navigate(`/recipe/${recipeId}`)
        // - Click logo → navigate('/search')
        //
        // DATI:
        // - Legge ricette da: useRecipesStore().recipes
        // - currentIndex gestito come stato locale (quale ricetta mostrare)
        path: "/discover",
        element: <AuthGuard><DiscoverRecipes /></AuthGuard>,
      },
      {
        // ========== ROTTA 4: DETTAGLI RICETTA (DINAMICA) ==========
        // URL: http://localhost:5173/recipe/123
        //      http://localhost:5173/recipe/456
        //
        // PARAMETRO DINAMICO:
        // - :id nella URL viene letto con useParams()
        // - Esempio: /recipe/123 → useParams() ritorna { id: "123" }
        //
        // COSA FA:
        // - Fetcha i dettagli completi della ricetta usando l'ID dalla URL
        // - Mostra: immagine, titolo, ingredienti estesi, istruzioni, vino, etc.
        // - Bottone "Go Back" per tornare al carosello
        //
        // NAVIGAZIONE:
        // - Click "Go Back" → navigate('/discover')
        //
        // DATI:
        // - ID ricetta da: useParams().id
        // - Dettagli fetchati dall'endpoint: /recipes/{id}/information
        // - Fallback: se fetch fallisce, usa fallbackRecipe dal mock
        path: "/recipe/:id",
        element: <AuthGuard><RecipeDetails /></AuthGuard>,
      },
    ],
  },
]);

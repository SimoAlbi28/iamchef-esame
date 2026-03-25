import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Search } from "lucide-react";
import type { IngredientInterface } from "../../../../types/recipes";
import SuggestList from "../suggest-item/SuggestList";
import useDebounce from "../../../../hooks/useDebounce";
import useApi from "../../../../hooks/useApi";
import { getIngredientURL } from "../../../../hooks/useApi";

// Definisco i tipi delle props che mi arrivano da fuori
type SearchBarProps = {
  // Callback richiamata quando l'utente seleziona un ingrediente dai suggerimenti
  handleSuggestClick: (ing: IngredientInterface) => void
}

// Il mio componente SearchBar: gestisce tutto ciò che riguarda la ricerca dell'ingrediente
const SearchBar = forwardRef<{ reset: () => void }, SearchBarProps>(({ handleSuggestClick }, ref) => {

  // ========== STATI LOCALI ==========
  // Stato per capire se l'input è attivo o meno (per gestire gli effetti grafici del focus)
  const [isFocused, setIsFocused] = useState(false);

  // Stato che contiene il testo scritto dall'utente nella searchbar
  const [searchingIng, setSearchingIng] = useState<string>("");

  // Espone il metodo reset al parent tramite useImperativeHandle
  useImperativeHandle(ref, () => ({
    reset: () => {
      setSearchingIng("");
      setStateURL("");
      setIsFocused(false);
    }
  }));

  //TODO: Rimuovere lo state locale stateURL una volta migrato a Zustand
  const [stateURL, setStateURL]=useState<string>("");

  const debounceSearchingIng = useDebounce (searchingIng, 1000);

  //TODO: Sostituire useApi con lo Zustand store per ingredienti API
  //TODO: Il store dovrebbe gestire automaticamente le chiamate API quando debounceSearchingIng cambia
  //TODO: Recuperare filteredIngredients, loading, error direttamente dallo store
  const {data: filteredIngredients, loading, error} = useApi<IngredientInterface[]>(stateURL);

  // ========== FILTRAGGIO MEMOIZZATO ==========
  // Usa useMemo per filtrare la lista degli ingredienti solo quando il valore digitato cambia
  // In questo modo evito filtraggi inutili su ogni render (ottimizzazione)
  // Ritorna array vuoto se la ricerca è vuota, altrimenti ritorna ingredienti che iniziano con il testo inserito

  // const filteredIngredients = () => {
  //   if (!searchingIng) return [];
  //   return ingredients.filter((ingredient) =>
  //     ingredient.name.startsWith(searchingIng)
  //   );
  // };

  //TODO: Una volta migrato a Zustand, questo useEffect non servirà più
  //TODO: Lo store si occuperà di triggherare la fetch quando searchingIng cambia (tramite debounce)
  useEffect(() => {

    if (debounceSearchingIng){
      //TODO: Sostituire con action del Zustand store che trigghera la fetch ingredienti
      setStateURL(getIngredientURL(debounceSearchingIng));

    }
  }, [debounceSearchingIng]);

  // ========== HANDLER ==========
  // Quando l'utente clicca su un suggerimento:
  // 1. Notifica il parent tramite callback
  // 2. Svuota la barra di ricerca per dare feedback visivo immediato
  const handleClick = (ing: IngredientInterface) => {
    handleSuggestClick(ing);
    setSearchingIng("");
  };

  // ========== RENDER ==========
  // JSX del componente: barra di ricerca + suggerimenti condizionali
  return (
    <>
      <div className="relative">
        {/* Effetto di focus: contorno bianco che appare quando l'input è attivo */}
        <div
          className={`absolute -inset-1.5 rounded-xl transition-all duration-300 ${
            isFocused
              ? "border-3 border-white opacity-100"
              : "border-2 border-transparent opacity-0"
          }`}
        />

        {/* Contenitore principale della searchbar */}
        <div
          className={`relative flex gap-3 bg-white rounded-lg px-4 py-3 transition-all duration-300 shadow-sm ${
            isFocused ? "shadow-lg" : ""
          }`}
        >
          {/* Icona lente di ricerca: cambia colore quando la barra è attiva (da grigio a verde) */}
          <Search
            className={`transition-colors duration-300 ${
              isFocused ? "stroke-green-500" : "stroke-gray-400"
            }`}
            size={20}
          />

          {/* Input vero e proprio: gestisce il testo e il focus */}
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="First ingredients ..."
            className="w-full bg-white border-none focus:outline-none text-black placeholder:text-gray-500"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={searchingIng}
            onChange={(e) => setSearchingIng(e.target.value)}
          />
        </div>
      </div>
      
      {error&&<p>ERRORE:{error}</p>}
      {loading&& <p>caricamento in corso...</p>}
      
      {/* Lista dei suggerimenti: mostra solo se l'utente ha digitato qualcosa */}
      {filteredIngredients && searchingIng.length > 0 && (
        <SuggestList
          ingredients={filteredIngredients}
          handleClick={handleClick}
        />
      )}
    </>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;

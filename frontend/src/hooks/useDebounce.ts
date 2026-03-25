import { useState, useEffect } from 'react'
/**
 * Hook personalizzato per il debouncing di un valore
 * 
 * @param value - Il valore da "debounciare" (es. testo di ricerca)
 * @param delay - Millisecondi di attesa prima di aggiornare il valore (es. 300ms)
 * @returns Il valore debounced, aggiornato solo dopo il delay
 * 
 * Come funziona:
 * 1. L'utente digita "ciao" lettera per lettera
 * 2. Ad ogni lettera, il timer viene resettato
 * 3. Solo quando l'utente smette di digitare per 300ms, il valore viene aggiornato
 * 4. Questo evita di fare una chiamata API per ogni singola lettera
 */
function useDebounce<T>(value: T, delay: number): T {
  // Stato interno che contiene il valore "ritardato"
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    // Impostiamo un timer che aggiornerà il valore dopo 'delay' millisecondi
    // Esempio: se delay = 300, aspetterà 300ms prima di eseguire questa funzione
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    // CLEANUP FUNCTION (molto importante!)
    // Questa funzione viene eseguita:
    // 1. Prima che l'effect venga rieseguito (quando value cambia)
    // 2. Quando il componente viene smontato
    // 
    // Cancella il timer precedente, così se l'utente continua a digitare,
    // il timer viene resettato e non aggiorna il valore fino a quando
    // non smette di digitare per 'delay' millisecondi
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // L'effect si riesegue quando value o delay cambiano
  
  // Ritorna il valore "debounced" (ritardato)
  return debouncedValue
}
export default useDebounce



/**
 * Componente di esempio che usa il debouncing per una barra di ricerca
 * 
 * Scenario senza debouncing:
 * - Utente digita "react"
 * - Vengono fatte 5 chiamate API: "r", "re", "rea", "reac", "react"
 * - Spreco di risorse e possibili problemi di performance
 * 
 * Scenario con debouncing:
 * - Utente digita "react"
 * - Viene fatta 1 sola chiamata API: "react" (dopo 300ms dall'ultima lettera)
 * - Ottimizzazione delle risorse e migliore esperienza utente
 */

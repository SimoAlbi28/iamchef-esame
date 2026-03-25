import ScrollBtn from "./ScrollBtn"

type ScrollBtnSectionProps = {
  // Indice corrente della ricetta visualizzata nel carosello
  currentIndex: number
  // Callback per aggiornare l'indice quando navighiamo tra le ricette
  setCurrentIndex: (index: number) => void
  // Indice massimo (numero di ricette - 1)
  maxIndex: number
  // Callback per tornare alla homepage
  goToHomepage:()=> void
}

export function ScrollBtnSection({ currentIndex, setCurrentIndex, maxIndex, goToHomepage }: ScrollBtnSectionProps) {
  // ========== COMPONENTE SCROLL BTN SECTION ==========
  // Sezione di navigazione del carosello con:
  // 1. Bottone freccia sinistra: naviga alla ricetta precedente (disabilitato se siamo all'inizio)
  // 2. Logo: cliccando torna alla homepage
  // 3. Bottone freccia destra: naviga alla ricetta successiva (disabilitato se siamo alla fine)

  return (
    <div className="py-2 flex gap-3 justify-center items-center">

      {/* ========== BOTTONE FRECCIA SINISTRA ========== */}
      {/* Naviga alla ricetta precedente, disabilitato se currentIndex === 0 */}
      {/* Lo stile (cursor, opacity) cambia in base al fatto che siamo all'inizio */}
      <ScrollBtn 
        currentIndex={currentIndex}
        isIncrement={false}
        maxIndex={maxIndex}
        onClick={setCurrentIndex}
        cursor={currentIndex == 0 ? "cursor-default" : "cursor-pointer"}
        opacity={currentIndex == 0 ? "opacity-50" : "opacity-100"}
      />

      {/* ========== LOGO CENTRAL ========== */}
      {/* Cliccando il logo torniamo alla homepage (SearchPage) */}
      <div 
        className="flex w-12 h-12 shrink-0"
        onClick={goToHomepage}
      >
        <img src="/icons/iAmChef_Logo.jpg" alt="Logo" className="w-full h-full rounded-lg"/>
      </div>

      {/* ========== BOTTONE FRECCIA DESTRA ========== */}
      {/* Naviga alla ricetta successiva, disabilitato se currentIndex === maxIndex */}
      {/* Lo stile (cursor, opacity) cambia in base al fatto che siamo alla fine */}
      <ScrollBtn 
        currentIndex={currentIndex}
        isIncrement={true}
        maxIndex={maxIndex}
        onClick={setCurrentIndex}
        cursor={currentIndex == maxIndex ? "cursor-default" : "cursor-pointer"}
        opacity={currentIndex == maxIndex ? "opacity-50" : "opacity-100"}
      />
        
    </div>
  )
}

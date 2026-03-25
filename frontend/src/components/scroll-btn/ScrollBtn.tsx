import React from "react";

type ScrollBtnProps = {
  // Indice corrente della ricetta visualizzata
  currentIndex: number,
  // Callback eseguita quando l'utente clicca il bottone
  // Riceve il nuovo indice calcolato in base a isIncrement
  onClick: (newIndex: number) => void;
  // Indice massimo (numero di ricette - 1)
  maxIndex: number,
  // Se true, il bottone incrementa l'indice (freccia destra)
  // Se false, il bottone decrementa l'indice (freccia sinistra)
  isIncrement: boolean,
  // Classe CSS per il cursore (cursor-pointer o cursor-default)
  cursor: string,
  // Classe CSS per l'opacità (opacity-100 o opacity-50)
  opacity: string
};

const ScrollBtn: React.FC<ScrollBtnProps> = ({ 
  currentIndex, 
  onClick, 
  maxIndex, 
  isIncrement ,
  cursor,
  opacity
}: ScrollBtnProps) => {
  // ========== COMPONENTE SCROLL BTN ==========
  // Bottone generico per navigare tra le ricette del carosello
  // Può incrementare (freccia destra) o decrementare (freccia sinistra) l'indice
  // Lo stile cambia in base allo stato: disabilitato ai bordi (inizio/fine)

  // ========== CALCOLO NUOVO INDICE ==========
  // Se isIncrement è true e non siamo alla fine, incrementa l'indice
  // Se isIncrement è false e non siamo all'inizio, decrementa l'indice
  // Altrimenti mantiene l'indice corrente (blocca ai bordi del carosello)
  const params = isIncrement 
                  ? currentIndex < maxIndex
                    ? currentIndex + 1
                    : currentIndex
                  : currentIndex > 0
                    ? currentIndex - 1
                    : currentIndex

  return (
    <button
      className={`${opacity} ${cursor}`}
      onClick={() => onClick(params)}
    >
      {/* ========== ICONA FRECCIA ========== */}
      {/* Usa la stessa icona per entrambe le frecce */}
      {/* Se isIncrement è false, ruota l'icona per creare l'effetto freccia sinistra */}
      <img className={`w-14 h-14 ${!isIncrement && "rotate-y-180"}`} src={`/icons/nextRecipeIcon.png`} />
    
    </button>
  );
};

export default ScrollBtn;

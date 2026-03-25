//? Funzione per convertire la difficoltà presa dall'api in una stringa userFriendly
export const getDifficulty = (readyInMinutes: number) => {
    if (readyInMinutes <= 15) return "Very Easy";
    if (readyInMinutes <= 30) return "Easy";
    if (readyInMinutes <= 60) return "Middle";
    return "Impegnativa";
  };
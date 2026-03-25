import { create } from 'zustand';
import type { IngredientInterface, RecipeInterface } from '../types/recipes';

// ========== STORE GLOBALE PER INGREDIENTI E RICETTE ==========
// Gestisce lo stato condiviso tra le pagine senza passare props
// Sostituisce gli stati locali in App.tsx

interface RecipesStoreState {
  // Array degli ingredienti selezionati dall'utente
  selectedIngredients: IngredientInterface[];
  
  // Array di ricette ottenuto dall'API
  recipes: RecipeInterface[];
  
  // Flag per indicare se la ricerca è in corso
  isLoading: boolean;
  
  // ========== ACTIONS ==========
  
  // Aggiunge un ingrediente alla lista (evita duplicati)
  addIngredient: (ingredient: IngredientInterface) => void;
  
  // Rimuove un ingrediente dalla lista
  removeIngredient: (ingredient: IngredientInterface) => void;
  
  // Reset di tutti gli ingredienti
  resetIngredients: () => void;
  
  // Salva le ricette trovate
  setRecipes: (recipes: RecipeInterface[]) => void;
  
  // Setta il flag di loading
  setIsLoading: (isLoading: boolean) => void;
}

export const useRecipesStore = create<RecipesStoreState>((set) => ({
  // ========== INITIAL STATE ==========
  selectedIngredients: [],
  recipes: [],
  isLoading: false,

  // ========== ACTIONS IMPLEMENTATION ==========
  
  addIngredient: (ingredient) =>
    set((state) => {
      // Controlla se l'ingrediente esiste già
      if (state.selectedIngredients.some(ing => ing.id === ingredient.id)) {
        return state; // Non fare nulla se esiste
      }
      return {
        selectedIngredients: [...state.selectedIngredients, ingredient],
      };
    }),

  removeIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter(
        (ing) => ing.id !== ingredient.id
      ),
    })),

  resetIngredients: () =>
    set({
      selectedIngredients: [],
    }),

  setRecipes: (recipes) =>
    set({
      recipes,
    }),

  setIsLoading: (isLoading) =>
    set({
      isLoading,
    }),
}));

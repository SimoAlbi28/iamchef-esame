export interface RecipeInterface {
    id: number;
    title: string;
    image: string | "https://img.spoonacular.com/recipes/982365-556x370.jpg";
    imageType: string;
    servings: number;
    readyInMinutes: number;
    cookingMinutes: number;
    preparationMinutes: number;
    license?: string;
    sourceName?: string;
    sourceUrl?: string;
    spoonacularSourceUrl?: string;
    healthScore?: number;
    spoonacularScore?: number;
    pricePerServing?: number;
    analyzedInstructions?: any[]; // Instructions structure might vary
    cheap?: boolean;
    creditsText?: string;
    cuisines?: string[];
    dairyFree?: boolean;
    diets?: string[];
    gaps?: string;
    glutenFree?: boolean;
    instructions?: string;
    ketogenic?: boolean;
    lowFodmap?: boolean;
    occasions?: string[];
    sustainable?: boolean;
    vegan?: boolean;
    vegetarian?: boolean;
    veryHealthy?: boolean;
    veryPopular?: boolean;
    whole30?: boolean;
    weightWatcherSmartPoints?: number;
    dishTypes?: string[];
    extendedIngredients: IngredientInterface[];
    summary?: string;
    winePairing?: WinePairing | null;
  }
  
  export interface WinePairing {
    pairedWines: string[];
    pairingText: string;
    productMatches: WineProduct[];
  }
  
  export interface WineProduct {
    id: number;
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    averageRating: number;
    ratingCount: number;
    score: number;
    link: string;
  }
  
export interface IngredientInterface {
    aisle: string;
    amount: number;
    consistency: string;
    id: number;
    image: string;
    measures: {
        metric: {
        amount: number;
        unitLong: string;
        unitShort: string;
        };
        us: {
        amount: number;
        unitLong: string;
        unitShort: string;
        };
    };
    meta?: string[];
    name: string;
    original: string;
    originalName: string;
    unit: string;
}




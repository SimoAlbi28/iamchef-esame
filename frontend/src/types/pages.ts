import type { RecipeInterface } from "./recipes";

export type Pages = 
    | { page: "SearchPage" }
    | { page: "Intropage" }
    | { page: "discover-recipes" }
    | { page: "recipe-details"; recipeData?: RecipeInterface }

export type currentPage = {
    currentPage: Pages,
    id?: number
}
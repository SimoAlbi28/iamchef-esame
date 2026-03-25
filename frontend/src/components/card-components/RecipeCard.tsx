import { fallbackRecipe } from "../../mock/mock";
import type { RecipeInterface } from "../../types/recipes";
import { getDifficulty } from "../../utils/getDifficulty";
import FavoriteButton from "./FavoriteButton";
import RecipeDishTypes from "./RecipeDishTypes";
import RecipeImage from "./RecipeImage";
import { RecipeIngredients } from "./RecipeIngredients";
import RecipeServings from "./RecipeServings";
import RecipeTime from "./RecipeTime";

type RecipeCardProps = {
  recipe: RecipeInterface;
  onClickDetails: (recipe: RecipeInterface) => void;
};

export const RecipeCard = ({ recipe, onClickDetails }: RecipeCardProps) => {
  const data = recipe || fallbackRecipe;

  return (
    <div className="w-full bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 rounded-3xl shadow-xl p-4 flex flex-col gap-6 overflow-hidden min-h-0">

      {/* Recipe Image */}
      <RecipeImage image={data.image} title={data.title} />

      {/* Recipe Title + Favorite */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-purple-800 text-xl font-extrabold tracking-tight underline decoration-purple-300 mb-1">
          {data.title || "Unknown Recipe"}
        </h2>
        <FavoriteButton
          spoonacularId={data.id}
          title={data.title}
          image={data.image}
          size="md"
        />
      </div>

      {/* Recipe Metadata */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-purple-700">
        <RecipeTime readyInMinutes={data.readyInMinutes} />
        <span className="text-purple-400">·</span>
        <RecipeServings servings={data.servings} />
        <span className="text-purple-400">·</span>
        <RecipeDishTypes dishTypes={data.dishTypes} />
        <span className="text-purple-400">·</span>
        <span className="flex items-center gap-1 bg-purple-200 text-purple-800 rounded-full px-2 py-0.5 font-bold">
          <span role="img" aria-label="difficulty">⭐</span>
          {getDifficulty(data.readyInMinutes)}
        </span>
      </div>

      {/* Ingredients List */}
      <RecipeIngredients extendedIngredients={data.extendedIngredients} />

      {/* Details Button */}
      <button
        onClick={() => onClickDetails(data)}
        className="mt-auto w-full bg-purple-700 text-white rounded-xl py-3 text-base font-extrabold shadow-md 
                   transition hover:bg-purple-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
      >
        View Details
      </button>
    </div>
  );
};

export default RecipeCard;

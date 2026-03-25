type RecipeServingsProps = {
    servings: number | undefined;
  };
  const RecipeServings = ({ servings }: RecipeServingsProps) => (
    <span className="flex items-center gap-1 bg-green-100 text-green-800 rounded-full px-2 py-0.5 font-semibold">
      <span role="img" aria-label="porzioni">🍽️</span>
      {servings ? `${servings} porzioni` : "Porzioni n/d"}
    </span>
  );
  
  export default RecipeServings;
  
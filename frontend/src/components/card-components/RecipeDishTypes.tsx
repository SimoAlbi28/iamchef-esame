type RecipeDishTypeProps = {
    dishTypes: string[] | undefined;
  };
  const RecipeDishType = ({ dishTypes }: RecipeDishTypeProps) => (
    <span className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-center font-medium">
      <span role="img" aria-label="piatto">🥗</span>
      {dishTypes && dishTypes.length > 0 ? dishTypes[0] : "Pasto"}
    </span>
  );
  
  export default RecipeDishType;
  
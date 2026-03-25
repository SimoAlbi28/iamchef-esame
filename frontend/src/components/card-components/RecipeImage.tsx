type RecipeImageProps = {
  image: string;
  title: string;
};

const RecipeImage = ({ image, title }: RecipeImageProps) => {
  const srcValue = image && image.length
    ? image
    : "https://images.unsplash.com/photo-1547385203-cfe7977b9fd0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171"

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg relative bg-gray-100 flex items-center justify-center mb-2">
      <img
        src={srcValue}
        alt={title || "Titolo non disponibile"}
        className="object-contain w-full max-h-56"
      />
      <div className="absolute inset-0" />
    </div>
  )
}

export default RecipeImage;

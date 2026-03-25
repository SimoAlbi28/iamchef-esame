export default function Titlesubtitle() {
  // ========== TITLESUBTITLE COMPONENT ==========
  // Shows the app logo and a short description
  // Completely static, no props or state

  return (
    <div className="flex flex-col gap-4 items-center w-full pb-6">
      
      {/* Logo container */}
      <div className="w-1/4">
        <img src="/icons/iAmChef_Logo.jpg" alt="app logo" className="rounded-lg shadow-md" />
      </div>
      
      {/* App descriptive title */}
      <p className="text-purple-200 font-jainiPurva text-lg font-normal leading-[1.3em] text-center">
         Ingredients → Ready Recipe 🧑‍🍳✨
      </p>
    </div>
  );
}

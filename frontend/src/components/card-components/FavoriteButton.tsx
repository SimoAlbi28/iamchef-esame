import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/apiConfigStore";
import { getApiBaseUrl } from "../../utils/api";

type FavoriteButtonProps = {
  spoonacularId: number;
  title: string;
  image: string;
  size?: "sm" | "md";
};

const FavoriteButton = ({ spoonacularId, title, image, size = "md" }: FavoriteButtonProps) => {
  const { token } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Non mostrare se non loggato
  if (!token) return null;

  const baseUrl = getApiBaseUrl();

  // Controlla se è già nei preferiti
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch(`${baseUrl}/favorites/check/${spoonacularId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok && !cancelled) {
          const data = await res.json();
          setIsFavorite(data.isFavorite);
        }
      } catch {
        // ignore
      }
    };
    check();
    return () => { cancelled = true; };
  }, [spoonacularId, token, baseUrl]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Non triggera il click sulla card
    if (loading) return;
    setLoading(true);

    try {
      if (isFavorite) {
        await fetch(`${baseUrl}/favorites/${spoonacularId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);
      } else {
        await fetch(`${baseUrl}/favorites`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ spoonacularId, title, image }),
        });
        setIsFavorite(true);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const sizeClass = size === "sm" ? "text-xl" : "text-2xl";

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`${sizeClass} transition-transform hover:scale-110 active:scale-95 cursor-pointer ${
        loading ? "opacity-50" : ""
      }`}
      title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      <svg width={size === "sm" ? 22 : 28} height={size === "sm" ? 22 : 28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
          fill={isFavorite ? "#FACC15" : "white"}
          stroke="black"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;

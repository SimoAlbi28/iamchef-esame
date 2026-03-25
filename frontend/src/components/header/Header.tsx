import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Titlesubtitle from "./components/title-subtitle/TitleSubtitle"
import { useAuthStore } from "../../store/apiConfigStore"
import { getApiBaseUrl } from "../../utils/api"

interface FavoriteItem {
  spoonacularId: number;
  title: string;
  image: string;
  savedAt: string;
}

interface HistoryItem {
  id: number;
  ingredients: string;
  resultCount: number;
  searchedAt: string;
}

const Header = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();

  // Profile dropdown (right)
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Hamburger drawer (left)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Data
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"favorites" | "history">("favorites");

  // Chiudi menu/drawer se click fuori
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data quando il drawer si apre
  const fetchData = useCallback(async () => {
    if (!token) return;
    const baseUrl = getApiBaseUrl();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [favRes, histRes] = await Promise.all([
        fetch(`${baseUrl}/favorites`, { headers }),
        fetch(`${baseUrl}/history`, { headers }),
      ]);
      if (favRes.ok) {
        const favData = await favRes.json();
        setFavorites(Array.isArray(favData) ? favData : []);
      }
      if (histRes.ok) {
        const histData = await histRes.json();
        setHistory(Array.isArray(histData) ? histData : []);
      }
    } catch (err) {
      console.error("Error fetching menu data:", err);
    }
  }, [token]);

  const handleToggleDrawer = () => {
    if (drawerOpen) {
      setDrawerOpen(false);
    } else {
      setDrawerOpen(true);
      setProfileOpen(false);
      fetchData();
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    setDrawerOpen(false);
    logout();
    navigate("/");
  };

  const handleFavoriteClick = (spoonacularId: number) => {
    setDrawerOpen(false);
    navigate(`/recipe/${spoonacularId}`);
  };

  const handleClearHistory = async () => {
    if (!token) return;
    const baseUrl = getApiBaseUrl();
    try {
      await fetch(`${baseUrl}/history`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory([]);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative">
      {/* Hamburger button - top left */}
      {user && (
        <div className="absolute top-4 left-4 z-50" ref={drawerRef}>
          <button
            onClick={handleToggleDrawer}
            className="w-10 h-10 rounded-full bg-purple-700 text-white font-bold text-lg flex items-center justify-center shadow-lg hover:bg-purple-600 transition cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Drawer panel */}
          {drawerOpen && (
            <div className="absolute left-0 mt-2 w-72 max-h-96 bg-white rounded-xl shadow-xl border border-purple-200 overflow-hidden flex flex-col">

              {/* Tabs */}
              <div className="flex border-b border-purple-100">
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`flex-1 px-3 py-2.5 text-sm font-bold transition cursor-pointer ${
                    activeTab === "favorites"
                      ? "text-purple-800 border-b-2 border-purple-700 bg-purple-50"
                      : "text-purple-400 hover:text-purple-600"
                  }`}
                >
                  Preferiti ({favorites.length})
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 px-3 py-2.5 text-sm font-bold transition cursor-pointer ${
                    activeTab === "history"
                      ? "text-purple-800 border-b-2 border-purple-700 bg-purple-50"
                      : "text-purple-400 hover:text-purple-600"
                  }`}
                >
                  Cronologia ({history.length})
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">

                {/* Favorites tab */}
                {activeTab === "favorites" && (
                  favorites.length === 0 ? (
                    <p className="text-sm text-purple-400 text-center py-6">Nessun preferito</p>
                  ) : (
                    <ul>
                      {favorites.map((fav) => (
                        <li key={fav.spoonacularId}>
                          <button
                            onClick={() => handleFavoriteClick(fav.spoonacularId)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition text-left cursor-pointer"
                          >
                            {fav.image && (
                              <img
                                src={fav.image}
                                alt={fav.title}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                            )}
                            <span className="text-sm font-semibold text-purple-800 truncate">
                              {fav.title}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )
                )}

                {/* History tab */}
                {activeTab === "history" && (
                  history.length === 0 ? (
                    <p className="text-sm text-purple-400 text-center py-6">Nessuna ricerca</p>
                  ) : (
                    <ul>
                      {history.map((h) => (
                        <li key={h.id} className="px-4 py-3 border-b border-purple-50">
                          <p className="text-sm font-semibold text-purple-800">{h.ingredients}</p>
                          <p className="text-xs text-purple-400 mt-0.5">
                            {h.resultCount} ricette &middot; {new Date(h.searchedAt).toLocaleDateString("it-IT")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>

              {/* Clear history button */}
              {activeTab === "history" && history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="w-full px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition border-t border-purple-100 cursor-pointer"
                >
                  Cancella cronologia
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Profile button - top right */}
      {user && (
        <div className="absolute top-4 right-4 z-50" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setDrawerOpen(false); }}
            className="w-10 h-10 rounded-full bg-purple-700 text-white font-bold text-sm flex items-center justify-center shadow-lg hover:bg-purple-600 transition cursor-pointer"
          >
            {user.username.charAt(0).toUpperCase()}
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-purple-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-purple-100">
                <p className="text-sm font-bold text-purple-800 truncate">{user.username}</p>
                <p className="text-xs text-purple-500 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      <Titlesubtitle />
    </div>
  )
}

export default Header

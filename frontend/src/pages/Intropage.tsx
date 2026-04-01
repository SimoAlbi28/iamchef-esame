import { useState } from "react";
import { toast } from "../components/Toast";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/apiConfigStore";
import { getApiBaseUrl } from "../utils/api";

export function Intropage() {
  const navigate = useNavigate();
  const { token, setAuth } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Se già autenticato, vai alla ricerca
  if (token) {
    navigate("/search");
    return null;
  }

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      const msg = "Compila tutti i campi";
      toast.error(msg);
      return;
    }
    if (!isLogin && !username.trim()) {
      const msg = "Inserisci un username";
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = getApiBaseUrl();
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const body = isLogin
        ? { email, password }
        : { username, email, password };

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();


      if (!response.ok) {
        const msg = data.errore || data.error || `Errore: ${response.status}`;
        toast.error(msg);
        return;
      }

      setAuth(data.token, { username: data.username, email: data.email });
      navigate("/search");
    } catch (err) {
      const msg = `Errore di connessione: ${(err as Error).message}`;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 via-white to-purple-100 p-6">

      {/* HEADER */}
      <section className="text-center mb-10">
        <h1 className="text-5xl font-black text-purple-800 drop-shadow-md tracking-tight">
          I AM CHEF
        </h1>
        <p className="text-lg text-purple-600 font-medium mt-2">
          Smart recipes. No stress.
        </p>
      </section>

      {/* CARD */}
      <section className="w-full max-w-2xl sm:max-w-xl backdrop-blur-xl bg-white/80 border border-purple-200 rounded-3xl shadow-xl p-6">

        <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          {isLogin ? "Login" : "Registrazione"}
        </h2>

        {/* USERNAME (solo registrazione) */}
        {!isLogin && (
          <>
            <label className="block text-sm font-semibold text-purple-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Il tuo username..."
              className="w-full px-4 py-3 mb-4 rounded-lg bg-purple-50 border-2 border-purple-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-700 transition-all outline-none text-purple-900 font-semibold placeholder-purple-400"
            />
          </>
        )}

        {/* EMAIL */}
        <label className="block text-sm font-semibold text-purple-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="La tua email..."
          className="w-full px-4 py-3 mb-4 rounded-lg bg-purple-50 border-2 border-purple-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-700 transition-all outline-none text-purple-900 font-semibold placeholder-purple-400"
        />

        {/* PASSWORD */}
        <label className="block text-sm font-semibold text-purple-700 mb-2">
          Password
        </label>
        <div className="relative flex items-center mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="La tua password..."
            className="w-full px-4 py-3 rounded-lg bg-purple-50 border-2 border-purple-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-700 transition-all outline-none text-purple-900 font-semibold placeholder-purple-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-purple-800 hover:opacity-75 transition cursor-pointer"
          >
            {showPassword ? "Nascondi" : "Mostra"}
          </button>
        </div>

        {/* ERROR gestito via toast */}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-3 px-4 ${
            isLoading
              ? "bg-purple-500 cursor-not-allowed opacity-70"
              : "bg-purple-700 hover:bg-purple-800 active:bg-purple-900 active:scale-95"
          } text-white font-bold rounded-xl shadow-md transition-all flex justify-center items-center gap-2`}
        >
          {isLoading
            ? "Caricamento..."
            : isLogin
            ? "Accedi"
            : "Registrati"}
        </button>

        {/* TOGGLE LOGIN/REGISTER */}
        <p className="text-sm text-gray-600 mt-5 text-center">
          {isLogin ? "Non hai un account?" : "Hai già un account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            className="text-purple-700 font-bold hover:underline cursor-pointer"
          >
            {isLogin ? "Registrati" : "Accedi"}
          </button>
        </p>
      </section>
    </main>
  );
}

export default Intropage;

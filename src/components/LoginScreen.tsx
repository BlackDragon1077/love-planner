import { useState } from "react";

type Props = {
  onLogin: () => void;
};

export default function LoginScreen({
  onLogin,
}: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const SECRET_PASSWORD = "lamumumu";

  function handleLogin() {
    if (password === SECRET_PASSWORD) {
      localStorage.setItem("loggedIn", "true");
      onLogin();
    } else {
      setError("Password non corretta");
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <div
        className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
        "
      >
        <h1 className="text-4xl font-bold text-white text-center">
          ❤️ Love Planner
        </h1>

        <p className="text-zinc-400 text-center mt-3">
          Area privata
        </p>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full
            mt-8
            rounded-xl
            bg-zinc-800
            border
            border-zinc-700
            px-4
            py-3
            text-white
          "
        />

        {error && (
          <p className="text-red-400 mt-3">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="
            w-full
            mt-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-pink-500
            to-violet-500
            text-white
            font-semibold
          "
        >
          Entra
        </button>
      </div>
    </div>
  );
}
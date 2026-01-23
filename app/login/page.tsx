"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handleLogin() {
    setError("");
    setLoading(true);

    const res = await fetch("http://localhost:8000/api/token/", {//TODO: url
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Usuário ou senha inválidos");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setLoading(false);

    // salvar token
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    // redirecionar
    window.location.href = "/carrinho";
  }


  return (
    <div className="max-w-md mx-auto mt-20 space-y-4 p-14 rounded-3xl bg-white shadow-md">
      <h1 className="text-xl font-semibold text-center">Login</h1>

      <input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded-sm p-2 w-full focus:outline-none focus:ring-0"
      />

      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-sm p-2 w-full focus:outline-none focus:ring-0"
      />

      {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white w-full p-2 rounded mt-6 flex mx justify-center"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </div>
  );
}
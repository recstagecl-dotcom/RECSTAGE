"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: Props) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("admin_auth="));
    if (cookie) {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(false);

      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (res.ok) {
          setAuthed(true);
        } else {
          setError(true);
          setPassword("");
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [password]
  );

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Cargando...</p>
      </div>
    );
  }

  if (authed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black tracking-tighter text-[#E50914]">
            REC STAGE
          </h1>
          <p className="text-neutral-500 mt-3 text-sm">
            Ingresá la contraseña para acceder al panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              autoFocus
              className={`w-full bg-neutral-900 border rounded-xl px-4 py-3.5 text-white text-sm placeholder-neutral-600 focus:outline-none transition-colors ${
                error
                  ? "border-red-600 focus:border-red-500"
                  : "border-neutral-700 focus:border-[#E50914]"
              }`}
            />
            {error && (
              <p className="text-red-500 text-xs mt-2">Contraseña incorrecta</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!password || loading}
            className="w-full py-3.5 rounded-xl bg-[#E50914] text-white font-medium text-sm transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

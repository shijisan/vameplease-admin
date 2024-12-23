'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {

      router.push('/'); 
    } else {
      setError(data.error || 'An error occurred');
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-b from-violet-300 to-pink-500">
      <form
        className="rounded-lg bg-white shadow p-4 space-y-3 max-w-md w-full"
        onSubmit={handleLogin}
      >
        <div className="flex justify-center items-center space-x-3">
          <img className="w-1/4" src="/logo.webp" alt="logo" />
          <h1 className="text-3xl font-semibold text-center flex">Login</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            className="border p-2 rounded-sm"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johnpork@example.com"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            className="border p-2 rounded-sm"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
            required
          />
        </div>
        <div>
          <a
            href="/"
            className="text-sm text-blue-500 hover:text-blue-400 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <div>
          <input
            type="submit"
            value="Login"
            className="w-full bg-purple-800 text-white text-center rounded p-2 transition-colors hover:cursor-pointer hover:bg-purple-700"
          />
        </div>
      </form>
    </section>
  );
}

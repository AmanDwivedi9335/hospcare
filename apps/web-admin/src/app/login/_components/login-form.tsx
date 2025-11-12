'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type LoginRole = 'staff' | 'superadmin';

type Props = {
  role: LoginRole;
  title: string;
  redirectHint: string;
};

type ApiResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'staff' | 'superadmin' | 'patient';
    organization?: string;
  };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

export function LoginForm({ role, title, redirectHint }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onboardingMessage =
    searchParams.get('onboarded') === '1'
      ? 'Your super admin workspace is ready. Sign in to continue.'
      : null;

  useEffect(() => {
    const emailFromParams = searchParams.get('email');
    if (emailFromParams) {
      setEmail((current) => (current ? current : emailFromParams));
    }
  }, [searchParams]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message ?? 'Unable to log in');
      }

      const data = (await response.json()) as ApiResponse;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('hospcare.auth', JSON.stringify(data));
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">{title}</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-1 w-full rounded border border-slate-300 p-2"
              placeholder="you@example.com"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-1 w-full rounded border border-slate-300 p-2"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">{redirectHint}</p>
        {role === 'superadmin' && (
          <p className="mt-2 text-sm text-slate-600">
            First time here?{' '}
            <Link href="/signup/superadmin" className="font-semibold text-blue-600 hover:text-blue-700">
              Create your control center
            </Link>
            .
          </p>
        )}
        {onboardingMessage && (
          <p className="mt-4 rounded bg-emerald-100 p-2 text-emerald-700">{onboardingMessage}</p>
        )}
        {error && <p className="mt-4 rounded bg-red-100 p-2 text-red-700">{error}</p>}
      </div>
    </main>
  );
}

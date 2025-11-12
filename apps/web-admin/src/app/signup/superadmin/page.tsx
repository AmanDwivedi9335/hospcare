'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';

export default function SuperAdminSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus(null);

    if (password.length < 8) {
      setError('Use at least 8 characters for a secure password.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/superadmin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          organization: organization || undefined,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message ?? 'Unable to create your super admin account');
      }

      setStatus('Account created! Redirecting you to sign in…');

      setTimeout(() => {
        router.push(`/login/superadmin?onboarded=1&email=${encodeURIComponent(email)}`);
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center">
        <section className="flex-1 space-y-6">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Super admin onboarding
          </span>
          <h1 className="text-4xl font-semibold text-slate-900 lg:text-5xl">
            Launch your hospital control center in minutes
          </h1>
          <p className="text-lg text-slate-600 lg:text-xl">
            Create your super admin workspace to configure hospitals, manage subscriptions, and monitor operations across every tenant.
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                1
              </span>
              <span>Tell us who you are and the organization you represent.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                2
              </span>
              <span>Secure your workspace with a strong password.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                3
              </span>
              <span>Sign in to access dashboards, provisioning tools, and audit logs.</span>
            </li>
          </ul>
        </section>

        <section className="flex-1">
          <div className="rounded-2xl bg-white p-8 shadow-xl shadow-blue-100">
            <h2 className="text-2xl font-semibold text-slate-900">Super admin sign up</h2>
            <p className="mt-2 text-sm text-slate-600">
              Already have access?{' '}
              <Link href="/login/superadmin" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
              .
            </p>
            <form className="mt-8 space-y-5" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  placeholder="Alex Morgan"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(event) => setOrganization(event.target.value)}
                  placeholder="Smart Hospital & Research Center"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="you@hospcare.com"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  placeholder="Repeat your password"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creating your workspace…' : 'Create super admin account'}
              </button>
            </form>
            {status && <p className="mt-4 rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700">{status}</p>}
            {error && <p className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>}
          </div>
        </section>
      </div>
    </main>
  );
}

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Choose a login | HospCare Admin',
};

const roles = [
  {
    name: 'Super admin',
    description: 'Provision hospitals, manage subscriptions, and oversee compliance across tenants.',
    href: '/login/superadmin',
  },
  {
    name: 'Staff portal',
    description: 'Access operational dashboards, schedules, and reporting tailored for frontline teams.',
    href: '/login/staff',
  },
];

export default function LoginLandingPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-16">
      <div className="mx-auto w-full max-w-3xl px-6">
        <h1 className="text-3xl font-semibold text-slate-900">Sign in to HospCare Admin</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Pick the workspace that matches your responsibilities. Each login uses the shared authentication API,
          so credentials will only unlock the features your role is allowed to manage.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {roles.map((role) => (
            <Link
              key={role.href}
              href={role.href}
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">{role.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{role.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
                Continue to {role.name} login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-1 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h9.69l-3.22-3.22a.75.75 0 111.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

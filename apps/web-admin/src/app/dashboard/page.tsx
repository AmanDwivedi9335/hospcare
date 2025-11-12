'use client';

import { type CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthPayload = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    organization?: string;
  };
};

const revenueWidgets = [
  { title: 'OPD Income', amount: '$12,400', delta: '+18.2%', color: 'bg-emerald-100 text-emerald-700' },
  { title: 'IPD Income', amount: '$23,744', delta: '+12.5%', color: 'bg-sky-100 text-sky-700' },
  { title: 'Pharmacy Income', amount: '$17,400', delta: '+9.1%', color: 'bg-violet-100 text-violet-700' },
  { title: 'Pathology Income', amount: '$13,870', delta: '+14.4%', color: 'bg-amber-100 text-amber-700' },
  { title: 'Radiology Income', amount: '$19,760', delta: '+11.8%', color: 'bg-cyan-100 text-cyan-700' },
  { title: 'General Income', amount: '$21,760', delta: '+16.5%', color: 'bg-blue-100 text-blue-700' },
  { title: 'Expenses', amount: '$9,256', delta: '-4.3%', color: 'bg-rose-100 text-rose-700' },
];

const yearlyIncomeVsExpense = [
  { month: 'Jan', income: 32, expense: 21 },
  { month: 'Feb', income: 35, expense: 22 },
  { month: 'Mar', income: 38, expense: 24 },
  { month: 'Apr', income: 42, expense: 26 },
  { month: 'May', income: 45, expense: 28 },
  { month: 'Jun', income: 48, expense: 29 },
  { month: 'Jul', income: 46, expense: 27 },
  { month: 'Aug', income: 49, expense: 28 },
  { month: 'Sep', income: 52, expense: 30 },
  { month: 'Oct', income: 55, expense: 32 },
  { month: 'Nov', income: 58, expense: 33 },
  { month: 'Dec', income: 62, expense: 35 },
];

const monthlyBreakdown = [
  { label: 'OPD', value: 32000, color: '#22c55e' },
  { label: 'IPD', value: 42000, color: '#3b82f6' },
  { label: 'Pathology', value: 18000, color: '#f59e0b' },
  { label: 'Pharmacy', value: 24000, color: '#8b5cf6' },
  { label: 'Radiology', value: 20000, color: '#06b6d4' },
];

const calendarHighlights = [
  { label: 'Mon', date: '9', tag: 'OPD', color: 'bg-emerald-100 text-emerald-700' },
  { label: 'Tue', date: '10', tag: 'Radiology', color: 'bg-cyan-100 text-cyan-700' },
  { label: 'Wed', date: '11', tag: 'Surgery', color: 'bg-rose-100 text-rose-700' },
  { label: 'Thu', date: '12', tag: 'Billing', color: 'bg-blue-100 text-blue-700' },
  { label: 'Fri', date: '13', tag: 'Inventory', color: 'bg-amber-100 text-amber-700' },
  { label: 'Sat', date: '14', tag: 'Rounds', color: 'bg-violet-100 text-violet-700' },
  { label: 'Sun', date: '15', tag: 'Audit', color: 'bg-slate-100 text-slate-700' },
];

const teamRoster = [
  { name: 'Admin 1', title: 'Operations', status: 'Online' },
  { name: 'Accountant', title: 'Finance', status: 'Online' },
  { name: 'Doctor', title: 'Cardiology', status: 'In OPD' },
  { name: 'Nurse Lead', title: 'Ward 3A', status: 'On Round' },
];

const navLinks = [
  { label: 'Dashboard', badge: '12', active: true },
  { label: 'Patient', badge: '124' },
  { label: 'Out Patient', badge: '58' },
  { label: 'In Patient', badge: '36' },
  { label: 'Blood Bank', badge: '4' },
  { label: 'Pharmacy', badge: '18' },
  { label: 'Pathology', badge: '9' },
  { label: 'Radiology', badge: '7' },
  { label: 'Income', badge: '$' },
  { label: 'Expense', badge: '$' },
  { label: 'Doctor', badge: '26' },
];

const Sidebar = () => (
  <aside className="hidden w-72 flex-shrink-0 flex-col justify-between bg-gradient-to-b from-blue-900 to-slate-900 p-6 text-slate-100 lg:flex">
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-wide text-blue-300">HospCare HQ</span>
        <p className="mt-2 text-xl font-semibold">Smart Hospital Platform</p>
      </div>
      <nav className="space-y-2">
        {navLinks.map((link) => (
          <div
            key={link.label}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
              link.active ? 'bg-white/10 font-semibold text-white shadow-lg shadow-blue-900/40' : 'hover:bg-white/5'
            }`}
          >
            <span>{link.label}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">{link.badge}</span>
          </div>
        ))}
      </nav>
    </div>
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-wide text-blue-200">Storage status</p>
      <p className="mt-1 text-sm">78% of provisioning capacity used</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[78%] rounded-full bg-emerald-400" />
      </div>
    </div>
  </aside>
);

const buildLinePoints = (key: 'income' | 'expense') => {
  const maxValue = Math.max(...yearlyIncomeVsExpense.map((point) => point.income));
  const stepX = 100 / (yearlyIncomeVsExpense.length - 1);

  return yearlyIncomeVsExpense
    .map((point, index) => {
      const x = index * stepX;
      const y = 100 - (point[key] / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');
};

const donutGradient: CSSProperties = (() => {
  const total = monthlyBreakdown.reduce((sum, entry) => sum + entry.value, 0);
  let accumulator = 0;
  const slices = monthlyBreakdown
    .map((entry) => {
      const start = (accumulator / total) * 360;
      accumulator += entry.value;
      const end = (accumulator / total) * 360;
      return `${entry.color} ${start}deg ${end}deg`;
    })
    .join(', ');

  return { backgroundImage: `conic-gradient(${slices})` };
})();

export default function DashboardPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<AuthPayload | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem('hospcare.auth');

    if (!stored) {
      setCheckedAuth(true);
      router.replace('/login/superadmin');
      return;
    }

    try {
      const parsed = JSON.parse(stored) as AuthPayload;
      setAuth(parsed);
    } catch (error) {
      console.error('Unable to parse auth payload', error);
      window.localStorage.removeItem('hospcare.auth');
      router.replace('/login/superadmin');
    } finally {
      setCheckedAuth(true);
    }
  }, [router]);

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('hospcare.auth');
    }
    router.push('/login/superadmin');
  };

  const organizationName = auth?.user.organization ?? 'Smart Hospital & Research Center';
  const displayName = auth?.user.name ?? 'Super Admin';

  if (!checkedAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm font-medium text-slate-600">Loading your control center…</p>
      </main>
    );
  }

  if (checkedAuth && !auth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm font-medium text-slate-600">Redirecting to sign in…</p>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white/60 p-6 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Dashboard</p>
            <h1 className="text-2xl font-semibold text-slate-900">{organizationName}</h1>
            <p className="mt-1 text-sm text-slate-500">Welcome back, {displayName}. All systems are operational.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-400" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{displayName}</p>
                <p className="text-xs text-slate-500">Super Administrator</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="space-y-8 p-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {revenueWidgets.map((widget) => (
              <div key={widget.title} className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-slate-500">{widget.title}</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{widget.amount}</p>
                <span className={`mt-3 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${widget.color}`}>
                  {widget.delta} vs last month
                </span>
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Yearly Income &amp; Expense</h2>
                  <p className="text-sm text-slate-500">Monitoring cash flow trends from Jan to Dec</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Income
                  </span>
                  <span className="flex items-center gap-1 text-rose-500">
                    <span className="h-2 w-2 rounded-full bg-rose-400" /> Expense
                  </span>
                </div>
              </div>
              <div className="relative h-72 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <polyline
                    fill="none"
                    stroke="url(#incomeGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    points={buildLinePoints('income')}
                  />
                  <polyline
                    fill="none"
                    stroke="url(#expenseGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    points={buildLinePoints('expense')}
                  />
                  {yearlyIncomeVsExpense.map((point, index) => (
                    <text key={point.month} x={(index / (yearlyIncomeVsExpense.length - 1)) * 100} y="98" className="fill-slate-400 text-[3px]">
                      {point.month}
                    </text>
                  ))}
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Monthly Income Overview</h2>
                <p className="text-sm text-slate-500">Breakdown of key revenue streams</p>
              </div>
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-slate-50" style={donutGradient}>
                <div className="h-24 w-24 rounded-full bg-white text-center">
                  <p className="mt-8 text-xs font-semibold text-slate-500">Total</p>
                  <p className="text-lg font-semibold text-slate-900">$138k</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                {monthlyBreakdown.map((item) => (
                  <li key={item.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-semibold text-slate-900">${(item.value / 1000).toFixed(1)}k</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Calendar</h2>
                  <p className="text-sm text-slate-500">November 9 – 15, 2025</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full border border-slate-200 px-3 py-1">Month</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1">Week</span>
                  <span className="rounded-full border border-slate-200 px-3 py-1">Day</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-7 gap-3 text-sm">
                {calendarHighlights.map((entry) => (
                  <div key={entry.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase text-slate-400">{entry.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">{entry.date}</p>
                    <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${entry.color}`}>
                      {entry.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Command Center</h2>
                <p className="text-sm text-slate-500">Realtime team presence</p>
              </div>
              <ul className="space-y-4">
                {teamRoster.map((member) => (
                  <li key={member.name} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                      <p className="text-xs text-slate-500">{member.title}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {member.status}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-sm text-slate-500">
                Need to onboard more staff? Sync roles from your HRIS or invite manually.
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

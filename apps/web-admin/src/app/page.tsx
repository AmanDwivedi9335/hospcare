import Link from 'next/link';

const stats = [
  {
    label: 'Hospitals launched',
    value: '42',
    helper: 'across 7 regions',
  },
  {
    label: 'Avg. onboarding time',
    value: '36 hrs',
    helper: 'from sign-up to go-live',
  },
  {
    label: 'Clinician satisfaction',
    value: '94%',
    helper: 'after the first month',
  },
];

const roleCards = [
  {
    name: 'Super Admin',
    tag: 'Platform HQ',
    description:
      'Spin up hospitals in minutes, assign subscription bundles, and monitor tenant-wide compliance from a single control plane.',
    highlights: [
      'Create and manage hospital tenants with custom domains',
      'Toggle modules per subscription in real time',
      'Audit activity streams and automate compliance alerts',
    ],
    cta: { label: 'Launch Control Center', href: '#super-admin' },
    accent: 'from-sky-500/20 via-sky-500/5 to-transparent',
  },
  {
    name: 'Doctor Workspace',
    tag: 'Clinical Productivity',
    description:
      'Everything a clinician needs: smart rounding lists, AI-assisted charting, and collaborative care plans that stay in sync.',
    highlights: [
      'Unified patient timeline with orders, labs, and vitals',
      'Task routing to nurses, pharmacists, and support teams',
      'Telehealth visit launcher with built-in coding tips',
    ],
    cta: { label: 'Preview Doctor Login', href: '#modules' },
    accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
  {
    name: 'Staff Command Center',
    tag: 'Operations',
    description:
      'Empower front-desk, billing, and ward managers with automated flows, real-time occupancy, and inventory visibility.',
    highlights: [
      'Drag-and-drop scheduling with waitlist automation',
      'Smart procurement with reorder alerts and vendor SLAs',
      'Revenue guardrails with automated denial insights',
    ],
    cta: { label: 'Explore Staff Portal', href: '#operations' },
    accent: 'from-amber-500/20 via-amber-500/5 to-transparent',
  },
  {
    name: 'Patient Companion',
    tag: 'Engagement',
    description:
      'A personalized experience for patients to manage appointments, bills, prescriptions, and care-team messaging securely.',
    highlights: [
      'Check-in from mobile with insurance verification',
      'Payment plans and wallet integrations',
      'HIPAA-compliant chat and visit summaries',
    ],
    cta: { label: 'Try Patient Experience', href: '#engagement' },
    accent: 'from-fuchsia-500/20 via-fuchsia-500/5 to-transparent',
  },
  {
    name: 'Nursing Console',
    tag: 'Care Coordination',
    description:
      'Unit-based huddles, medication administration records, and escalation protocols tailored to each hospital’s workflows.',
    highlights: [
      'Real-time bed board with acuity scoring',
      'eMAR with barcode scanning and adverse event prevention',
      'Handoff summaries with voice dictation support',
    ],
    cta: { label: 'Review Nursing Tools', href: '#operations' },
    accent: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
  },
  {
    name: 'Analytics Studio',
    tag: 'Insights',
    description:
      'Surface executive dashboards, financial KPIs, and operational pulse checks that can be shared across tenants securely.',
    highlights: [
      'Cross-tenant benchmarking with anonymized cohorts',
      'Drag-and-drop storyboards for leadership reviews',
      'Embedded predictive models for census and supply needs',
    ],
    cta: { label: 'Open Data Room', href: '#insights' },
    accent: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
  },
];

const modules = [
  {
    name: 'Accounts & Billing',
    icon: '💳',
    description:
      'Revenue cycle automation with payer-specific rules, payment reminders, and integrated ledger exports.',
    features: [
      'Multi-entity chart of accounts with role-based controls',
      'Denial prevention playbooks and audit trails',
      'Patient wallet, POS, and instalment plans',
    ],
    accent: 'from-sky-500/30 via-sky-500/5 to-slate-900/60',
  },
  {
    name: 'Clinical',
    icon: '🩺',
    description:
      'End-to-end patient journey from triage to discharge with AI-assisted documentation and care coordination.',
    features: [
      'Structured visit templates across specialties',
      'FHIR-native interoperability and e-prescriptions',
      'Care team messaging with escalation logic',
    ],
    accent: 'from-emerald-500/30 via-emerald-500/5 to-slate-900/60',
  },
  {
    name: 'Operations',
    icon: '🏥',
    description:
      'Optimize staffing, theatre utilization, and supply chain with predictive insights and automated workflows.',
    features: [
      'Capacity planning with real-time acuity scoring',
      'Roster automation and labor compliance checks',
      'Inventory lifecycle with supplier collaboration',
    ],
    accent: 'from-amber-500/30 via-amber-500/5 to-slate-900/60',
  },
  {
    name: 'Engagement',
    icon: '💬',
    description:
      'Hyper-personalized patient outreach, feedback loops, and marketing automations tied to clinical outcomes.',
    features: [
      'Journey builder with segmentation and cohorts',
      'NPS, CAHPS, and service recovery dashboards',
      'Omnichannel reminders with WhatsApp & SMS',
    ],
    accent: 'from-fuchsia-500/30 via-fuchsia-500/5 to-slate-900/60',
  },
  {
    name: 'Research',
    icon: '🔬',
    description:
      'Manage studies, consent, and data extraction while keeping privacy guardrails for every tenant.',
    features: [
      'Protocol libraries with IRB workflows',
      'De-identified data sandboxes and notebooks',
      'Automated investigator onboarding',
    ],
    accent: 'from-indigo-500/30 via-indigo-500/5 to-slate-900/60',
  },
  {
    name: 'Marketplace',
    icon: '🧩',
    description:
      'Extend your hospital with connected apps, partner services, and device integrations curated by HospCare.',
    features: [
      'App directory with consent-based provisioning',
      'IoT gateway for bedside and wearable data',
      'Contract and SLA monitoring',
    ],
    accent: 'from-cyan-500/30 via-cyan-500/5 to-slate-900/60',
  },
];

const onboardingSteps = [
  {
    title: 'Blueprint your hospital',
    description:
      'Import legacy data or start fresh with our guided setup. Define locations, specialties, and compliance policies per tenant.',
    deliverables: ['Custom domains & branding', 'Policy guardrails & retention rules'],
  },
  {
    title: 'Choose subscription modules',
    description:
      'Bundle modules that match your hospital’s needs. Super admins can mix-and-match or schedule upgrades per billing cycle.',
    deliverables: ['Module toggles with preview sandboxes', 'Usage-based and flat-fee billing options'],
  },
  {
    title: 'Invite teams securely',
    description:
      'Provision doctors, staff, and partners with SSO, MFA, and Just-In-Time role assignments that adapt as teams evolve.',
    deliverables: ['Directory sync & HRIS connectors', 'Granular permissions down to record type'],
  },
  {
    title: 'Monitor, iterate, scale',
    description:
      'Dashboards surface tenant KPIs, SLAs, and adoption metrics. Push playbooks, nudges, and automation across your network.',
    deliverables: ['Predictive alerts & anomaly detection', 'Cross-tenant benchmarking'],
  },
];

const automationHighlights = [
  {
    title: 'Workflow Builder',
    body: 'Drag-and-drop automations that trigger when claims are denied, labs are delayed, or discharge packets are incomplete.',
  },
  {
    title: 'Compliance Engine',
    body: 'Regional templates ensure HIPAA, NABH, and GDPR readiness with continuous auditing and evidence snapshots.',
  },
  {
    title: 'Insights Broadcast',
    body: 'Schedule digest emails or Teams/Slack digests so every role receives the metrics that matter most.',
  },
];

export default function Index() {
  return (
    <main className="relative overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-x-0 -top-1/3 -z-10 h-[720px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%)]"></div>
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-10 lg:px-12">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 p-10 sm:p-16">
          <div className="absolute inset-y-0 right-0 -mr-24 hidden w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.35),_transparent_65%)] blur-3xl sm:block" />
          <div className="relative grid gap-12 md:grid-cols-[1.25fr,1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-1 text-sm font-medium text-sky-200">
                SaaS for Modern Hospitals
              </span>
              <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl">
                Launch hospital networks in days, not quarters.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-200/80">
                HospCare HQ delivers a multi-tenant hospital management platform with curated workspaces for every role. Select
                the modules you need, invite teams, and keep operations, finances, and patient experiences in sync across your
                entire ecosystem.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="#super-admin"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-400/40 hover:bg-sky-300"
                >
                  Get started as Super Admin
                  <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="#modules"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-white/40"
                >
                  Explore module catalog
                </Link>
              </div>
            </div>
            <div className="glass relative rounded-3xl p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-300">Tenant snapshot</p>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Live sync
                </span>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Current tenant</p>
                  <h3 className="mt-2 text-2xl font-semibold">Aurora Medical Group</h3>
                  <p className="mt-1 text-sm text-slate-400">6 locations • 480 clinicians • Modules: Clinical, Accounts, Engagement</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Net promoter score</p>
                    <p className="mt-2 text-3xl font-semibold text-emerald-300">78</p>
                    <p className="text-xs text-emerald-200">↑ 6 pts vs last quarter</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-slate-400">Claims auto-approval</p>
                    <p className="mt-2 text-3xl font-semibold text-sky-300">91%</p>
                    <p className="text-xs text-sky-200">Powered by Accounts module</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Upcoming automation</p>
                  <p className="mt-2 text-sm text-slate-200/80">
                    Trigger onboarding workflow for the new oncology wing once the Operations module is activated on April 12.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <dl className="mt-14 grid gap-6 text-sm text-slate-300 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <dt>{item.label}</dt>
                <dd className="mt-2 text-3xl font-semibold text-white">{item.value}</dd>
                <p className="mt-1 text-xs text-slate-400">{item.helper}</p>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-20 space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-200">Role-based workspaces</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Purpose-built logins for every hospital persona.</h2>
              <p className="mt-4 max-w-3xl text-base text-slate-300">
                Each portal is tuned for the day-to-day reality of clinicians, back-office teams, and patients. Super admins keep
                everything aligned while tenants enjoy a seamless, branded experience.
              </p>
            </div>
            <Link
              href="#modules"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-200"
            >
              Map modules to workspaces
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="card-grid">
            {roleCards.map((card) => (
              <article
                key={card.name}
                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-white/20`}
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${card.accent}`} />
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200/80">{card.tag}</span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{card.name}</h3>
                <p className="mt-3 text-sm text-slate-200/80">{card.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200/70">
                  {card.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={card.cta.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 hover:text-sky-100"
                >
                  {card.cta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="modules" className="mt-20 space-y-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-emerald-200">Module-based subscriptions</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Turn on the modules your tenant subscribes to.</h2>
            <p className="mt-4 text-base text-slate-300">
              HospCare’s modular architecture lets every hospital pay only for what they need. Modules can be bundled, scheduled
              for future activation, or trialled in sandboxes before release.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {modules.map((module) => (
              <article
                key={module.name}
                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${module.accent} p-8`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                  <span role="img" aria-hidden="true">
                    {module.icon}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{module.name}</h3>
                <p className="mt-3 text-sm text-slate-200/80">{module.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200/70">
                  {module.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#pricing"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-100 hover:text-white"
                >
                  Add to subscription
                  <span aria-hidden="true">+</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="super-admin" className="mt-20 space-y-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-cyan-200">Super admin cockpit</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Launch, manage, and scale tenants without engineering tickets.</h2>
              <p className="mt-4 text-base text-slate-300">
                Your super admin console centralizes tenant creation, subscription orchestration, and compliance monitoring.
                Workflows help you move fast while staying audit-ready.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-5 py-2.5 text-sm font-semibold text-cyan-200 hover:border-cyan-300"
            >
              View sample automation runbook
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/40 to-transparent sm:block" />
            <div className="space-y-8">
              {onboardingSteps.map((step, index) => (
                <div key={step.title} className="glass relative rounded-3xl p-6 sm:ml-12 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20 text-lg font-semibold text-cyan-200">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-200/80">{step.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-3 text-xs text-slate-200/70">
                        {step.deliverables.map((deliverable) => (
                          <li key={deliverable} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="operations" className="mt-20 space-y-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-violet-200">Automation library</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Automate cross-functional workflows with guardrails.</h2>
            <p className="mt-4 text-base text-slate-300">
              Bring finance, clinical, and operational teams together using reusable automations. Trigger them manually or based
              on events across your EHR, LIS, PACS, HRIS, or billing systems.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {automationHighlights.map((item) => (
              <article key={item.title} className="glass rounded-3xl p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-200/80">{item.body}</p>
                <Link href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-violet-100">
                  Browse playbooks
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="engagement" className="mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/60 to-slate-950">
          <div className="grid gap-10 px-10 py-14 md:grid-cols-[1.2fr,1fr]">
            <div>
              <p className="text-sm font-semibold text-emerald-200">Security & trust</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">Enterprise-grade foundation patients and clinicians trust.</h2>
              <p className="mt-4 text-base text-slate-300">
                SOC 2 Type II, HIPAA, GDPR, and regional compliance come standard. Tenant isolation, encrypted data lakes, and
                zero-trust access keep sensitive information secure without sacrificing usability.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-200/80">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">✓</span>
                  Dedicated data residency per tenant and lifecycle retention policies.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">✓</span>
                  Federated SSO, SCIM provisioning, and adaptive MFA across every workspace.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">✓</span>
                  Built-in audit explorer with immutable event timelines and exports.
                </li>
              </ul>
            </div>
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-white">Experience the patient companion</h3>
              <p className="mt-3 text-sm text-slate-200/80">
                Branded digital front door with appointment booking, self check-in, secure messaging, and bill pay in one place.
              </p>
              <div className="mt-6 space-y-4 text-sm text-slate-200/70">
                <p>
                  <span className="font-semibold text-white">Adaptive journeys:</span> personalize outreach based on diagnosis,
                  location, or care plan milestones.
                </p>
                <p>
                  <span className="font-semibold text-white">Care circle access:</span> invite family or caregivers with
                  granular permissions and consent tracking.
                </p>
                <p>
                  <span className="font-semibold text-white">Multilingual UI:</span> 14 languages with region-aware terminology.
                </p>
              </div>
              <Link
                href="#"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-5 py-2.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/30"
              >
                View patient journey demo
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="insights" className="mt-20 rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center">
          <p className="text-sm font-semibold text-sky-200">Ready to modernize hospital operations?</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Launch your first tenant with HospCare HQ today.</h2>
          <p className="mt-4 text-base text-slate-300">
            Start with a 30-day pilot, onboard key roles, and expand modules as teams fall in love with the experience. Our
            implementation partners and success team handle the heavy lifting.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="mailto:hello@hospcare.com"
              className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-400/30 hover:bg-sky-300"
            >
              Talk to sales
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-white/40"
            >
              Launch sandbox tenant
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LoginForm } from '../_components/login-form';

type Role = 'staff' | 'superadmin';

const roleConfig: Record<Role, { title: string; redirectHint: string }> = {
  staff: {
    title: 'Staff sign in',
    redirectHint: 'Need elevated access? Head over to the super admin login at /login/superadmin.',
  },
  superadmin: {
    title: 'Super admin sign in',
    redirectHint: 'Looking for the staff portal? Visit /login/staff instead.',
  },
};

const isRole = (value: string): value is Role => Object.hasOwn(roleConfig, value);

type PageProps = {
  params: { role: string };
};

export function generateMetadata({ params }: PageProps): Metadata {
  if (!isRole(params.role)) {
    return { title: 'Login not found | HospCare Admin' };
  }

  const { title } = roleConfig[params.role];
  return { title: `${title} | HospCare Admin` };
}

export default function RoleLoginPage({ params }: PageProps) {
  if (!isRole(params.role)) {
    notFound();
  }

  const { title, redirectHint } = roleConfig[params.role];

  return <LoginForm role={params.role} title={title} redirectHint={redirectHint} />;
}

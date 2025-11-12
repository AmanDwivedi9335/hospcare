import { Metadata } from 'next';
import { LoginForm } from '../_components/login-form';

export const metadata: Metadata = {
  title: 'Super Admin Login | HospCare Admin',
};

export default function SuperAdminLoginPage() {
  return (
    <LoginForm
      role="superadmin"
      title="Super admin sign in"
      redirectHint="Need staff access instead? Visit /login/staff."
    />
  );
}

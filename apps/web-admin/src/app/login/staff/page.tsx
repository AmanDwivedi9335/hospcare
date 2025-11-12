import { Metadata } from 'next';
import { LoginForm } from '../_components/login-form';

export const metadata: Metadata = {
  title: 'Staff Login | HospCare Admin',
};

export default function StaffLoginPage() {
  return (
    <LoginForm
      role="staff"
      title="Staff sign in"
      redirectHint="Need a different role? Try the super admin login at /login/superadmin."
    />
  );
}

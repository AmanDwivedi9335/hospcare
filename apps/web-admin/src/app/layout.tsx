import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HospCare HQ | SaaS Hospital Management Platform',
  description:
    'Multi-tenant hospital management suite with role-based workspaces and module subscriptions for modern healthcare teams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

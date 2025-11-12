import type { PropsWithChildren } from 'react';

export interface HospcarePackagesProps {
  /** Optional title to render as the heading. */
  title?: string;
  /** Additional class names applied to the wrapper. */
  className?: string;
}

export function HospcarePackages({
  title = 'Hospcare Packages',
  className,
  children,
}: PropsWithChildren<HospcarePackagesProps>) {
  return (
    <section className={className ?? ''}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}

export default HospcarePackages;

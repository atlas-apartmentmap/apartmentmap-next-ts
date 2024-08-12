'use client';

import AuthBackgroundLayout from '@/layouts/auth/background';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthBackgroundLayout>{children}</AuthBackgroundLayout>;
}

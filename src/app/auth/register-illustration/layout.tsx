"use client";

import AuthIllustrationLayout from "@/layouts/auth/illustration";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthIllustrationLayout>{children}</AuthIllustrationLayout>;
}

"use client";

import AuthCoverLayout from "@/layouts/auth/cover";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthCoverLayout
      title="Hi, Welcome Back"
      images={["/assets/images/brisbane/LoginScreen.png"]}
    >
      {children}
    </AuthCoverLayout>
  );
}

import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return <div className='flex h-full w-full items-center justify-center p-4'>{children}</div>;
}

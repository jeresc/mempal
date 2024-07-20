import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <main className='flex h-full w-full items-center justify-center py-4'>{children}</main>
      <footer className='h-fit px-2 text-center leading-[4rem] opacity-70'>
        © {new Date().getFullYear()} Mempal
      </footer>
    </div>
  );
}

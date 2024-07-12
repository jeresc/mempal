"use client";

import {useRouter} from "next/navigation";

import {cn} from "@/lib/utils";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  className?: string;
  asChild?: boolean;
}

export function LoginButton({children, mode = "redirect", className, asChild}: LoginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    if (mode === "redirect") {
      router.push("/auth/login");
    }
  };

  if (mode === "modal") {
    return <span className={cn("cursor-pointer", className)}>{children}</span>;
  }

  return (
    <span className={cn("cursor-pointer", className)} onClick={onClick}>
      {children}
    </span>
  );
}

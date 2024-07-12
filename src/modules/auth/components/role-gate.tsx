"use client";

import {UserRole} from "@prisma/client";

// import {FormError} from "../form/form-error";

import {useCurrentUserRole} from "~/auth/hooks/use-current-role";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGate({children, allowedRoles}: RoleGateProps) {
  const userRole = useCurrentUserRole();

  return allowedRoles.includes(userRole as UserRole) ? (
    children
  ) : (
    <p>You do not have permission to access this page.</p>
  );
}

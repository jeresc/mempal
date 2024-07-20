import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside>
      <h1>Sidebar</h1>
      {/* TODO: Add sidebar content */}
      <Link href='/new-document'>New Document</Link>
    </aside>
  );
}

"use client";

import { LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-zinc-100 p-4 border-b lg:px-20 sm:px-10 border-slate-200">
      <h3 className="text-2xl">Nav</h3>
      <ul>
        <li className="cursor-pointer hover:bg-red-200/50 transition rounded-lg p-2">
          <LogOut color="red" size={20} />
        </li>
      </ul>
    </nav>
  );
}

"use client";

import {
  Bot,
  Briefcase,
  FolderKanban,
  Home,
  Layers,
  Mail,
  User,
} from "lucide-react";
import { navLinks } from "@/data/portfolio";

const icons = [Home, User, Briefcase, FolderKanban, Layers, Bot, Mail];

export default function SideNav() {
  return (
    <aside className="side-nav fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full p-1.5 lg:bottom-auto lg:left-4 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:flex-col lg:rounded-2xl lg:p-2">
      {navLinks.map((link, i) => {
        const Icon = icons[i] ?? Home;
        return (
          <a
            key={link.href}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-accent lg:rounded-xl"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </aside>
  );
}

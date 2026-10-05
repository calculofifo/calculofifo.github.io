import { BookOpen, Calculator, GraduationCap, UserRound, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const mainNav: readonly NavItem[] = [
  { href: "/aprender", label: "Aprender", icon: GraduationCap },
  { href: "/cursos", label: "Cursos", icon: BookOpen },
  { href: "/herramientas", label: "Herramientas", icon: Calculator },
  { href: "/perfil", label: "Perfil", icon: UserRound },
];

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

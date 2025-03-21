import { Icon } from "@iconify/react";
import { NavLink, useLocation } from "react-router-dom";

export function Sidebar() {
  type links = {
    name: string;
    href: string;
    icon: string;
    subroot: string;
  };

  const { pathname } = useLocation();
  const links = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: "material-symbols:dashboard-rounded",
      subroot: "/admin/dashboard",
    },
    {
      name: "Home",
      href: "/admin/layout/home",
      icon: "mdi:home",
      subroot: "/admin/layout/home",
    },
    {
      name: "About",
      href: "/admin/layout/about",
      icon: "mdi:about",
      subroot: "/admin/admin/layout/about",
    },
    {
      name: "Robotic Intelligence",
      href: "/admin/layout/robotic-intelligence",
      icon: "mdi:robot",
      subroot: "/admin/layout/robotic-intelligence",
    },
    {
      name: "Human-Robot Interaction",
      href: "/admin/layout/human-robot-interaction",
      icon: "mdi:human-handsup",
      subroot: "/admin/layout/human-robot-interaction",
    },
    {
      name: "G Bot Features",
      href: "/admin/layout/robot-features",
      icon: "game-icons:tracked-robot",
      subroot: "/admin/layout/robot-features",
    },
    {
      name: "Future Tech",
      href: "/admin/layout/future-tech",
      icon: "mdi:robot",
      subroot: "/admin/layout/future-tech",
    },
  ];

  return (
    <nav className='grid items-start gap-2 px-2 text-sm font-medium lg:px-4'>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.href}
          className={`group flex items-center gap-2 rounded-lg transition-all duration-200 ease-in-out p-3  ${
            link.subroot === pathname || pathname.includes(link.subroot)
              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
              : "text-slate-800 hover:bg-slate-700 hover:text-white"
          }`}>
          <Icon icon={link.icon} className='h-4 w-4' />
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
}

"use client";

import { CalendarCheck, Scissors, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    label: "Book",
    href: "/admin/book",
    icon: <CalendarCheck size={20} />,
  },
  { label: "Masters", href: "/admin/masters", icon: <Users size={20} /> },
  { label: "Services", href: "/admin/servicess", icon: <Scissors size={20} /> },
  { label: "Settings", href: "/admin/settingss", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 bg-gray-100 text-gray-800 p-6 border-r border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ color: "gray" }}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-decoration-none mt-3
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 hover:text-blue-600"
                }`}
            >
              <span className={`${isActive ? "text-white" : "text-gray-600"}`}>
                {item.icon}
              </span>
              <span className={`${isActive ? "text-white" : "text-gray-600"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

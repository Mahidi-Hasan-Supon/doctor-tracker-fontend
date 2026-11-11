"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  HeartPulse,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  UserRound,
  Stethoscope,
  Users,
  Settings,
} from "lucide-react";

import { useGetMe, useLogout } from "@/hooks";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Doctors", href: "/doctors" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const accountLinks = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "My Profile",
    href: "/admin/profile",
    icon: UserRound,
  }
];

export default function HeaderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { isSuccess, isLoading } = useGetMe();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
            <HeartPulse size={24} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Doctor<span className="text-green-600">Tracker</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-gray-500">
              YOUR HEALTH, OUR PRIORITY
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="relative hidden items-center gap-3 md:flex">
          {!isLoading &&
            (isSuccess ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-2 transition-all hover:border-green-200 hover:bg-green-50/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <UserRound size={19} />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">Admin</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                    <div className="border-b border-gray-100 px-3 py-3">
                      <p className="text-sm font-semibold text-gray-800">
                        Admin Account
                      </p>
                      <p className="text-xs text-gray-500">
                        Manage your workspace
                      </p>
                    </div>

                    <div className="py-2">
                      {accountLinks.map((item) => {
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-green-700"
                          >
                            <Icon size={17} />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                      >
                        <LogOut size={17} />
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-green-50 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-gray-100 pt-4">
            {!isLoading &&
              (isSuccess ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                      <UserRound size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Admin
                      </p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                  </div>

                  {accountLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-700"
                      >
                        <Icon size={18} />
                        {item.name}
                      </Link>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="flex w-full items-center gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}

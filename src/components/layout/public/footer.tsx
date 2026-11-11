
"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Heart,
  LayoutDashboard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Platform Overview", href: "/#overview" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
];

const features = [
  { label: "Doctor Management", icon: Stethoscope },
  { label: "Patient Management", icon: Users },
  { label: "Patient Assignment", icon: Activity },
  { label: "Dashboard Analytics", icon: LayoutDashboard },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-green-100 bg-white">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-green-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                <Stethoscope size={23} />
              </div>

              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Doctor<span className="text-green-600">Tracker</span>
                </span>
                <p className="text-[11px] font-medium tracking-wider text-slate-400">
                  DOCTOR & PATIENT MANAGEMENT
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
              A centralized platform to organize doctor profiles, patient
              records, assignments, and management analytics.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
              <ShieldCheck size={15} />
              Secure Admin Management
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-base font-bold text-slate-900">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-green-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-5 text-base font-bold text-slate-900">
              Platform Features
            </h3>

            <ul className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <li
                    key={feature.label}
                    className="flex items-center gap-3 text-sm text-slate-500"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                      <Icon size={16} />
                    </div>
                    {feature.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-base font-bold text-slate-900">
              Get In Touch
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-500">
              Have questions about the platform? Feel free to get in touch.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <Mail size={17} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    care@guide.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Access</p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    Authorized administrators only
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/15 transition hover:bg-green-700"
            >
              Admin Login
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Doctor Tracker. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-slate-500">
            Built with
            <Heart size={14} className="fill-green-600 text-green-600" />
            for better management
          </p>

          <div className="flex items-center gap-2 text-xs font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Doctor Tracker Platform
          </div>
        </div>
      </div>
    </footer>
  );
}

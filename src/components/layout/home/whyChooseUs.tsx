"use client";

import { motion } from "motion/react";
import {
  Activity,
  ArrowUpRight,
  ChartNoAxesCombined,
  Database,
  LockKeyhole,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Workflow,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Secure Admin Access",
    description:
      "Protected authentication keeps the management dashboard accessible only to authorized administrators.",
  },
  {
    icon: Users,
    title: "Centralized Management",
    description:
      "Manage doctor profiles, patient records, and their assignments from one organized platform.",
  },
  {
    icon: Search,
    title: "Quick Search & Filters",
    description:
      "Find the records you need with search, filters, and pagination for easier navigation.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Insightful Analytics",
    description:
      "Understand doctor and patient statistics through visual charts and dashboard summaries.",
  },
  {
    icon: Workflow,
    title: "Easy Patient Assignment",
    description:
      "Connect patients with doctors and manage assigned patient lists from one place.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible Date Filtering",
    description:
      "Explore dashboard analytics with daily, monthly, and yearly date filtering options.",
  },
];

const highlights = [
  {
    icon: LockKeyhole,
    title: "Protected Access",
    description: "Secure admin authentication",
  },
  {
    icon: Database,
    title: "Organized Records",
    description: "Doctors and patients in one place",
  },
  {
    icon: Activity,
    title: "Visual Insights",
    description: "Data-driven dashboard overview",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <ShieldCheck size={16} />
            Why Choose Doctor Tracker
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Everything organized,{" "}
            <span className="text-green-600">management simplified.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            A practical platform designed to make doctor and patient
            administration more organized, accessible, and easier to manage.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl hover:shadow-green-950/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-green-700">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {benefit.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-green-700">
                  <span>Better management</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-2xl border border-green-200 bg-green-50/70 p-6 sm:p-8"
        >
          <div className="mb-7 max-w-xl">
            <span className="text-sm font-semibold text-green-700">
              BUILT FOR SIMPLICITY
            </span>
            <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
              Everything you need to manage your records.
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 shadow-sm">
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

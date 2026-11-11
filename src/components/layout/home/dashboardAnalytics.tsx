"use client";

import { motion } from "motion/react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardList,
  Stethoscope,
  Users,
} from "lucide-react";

const overviewCards = [
  {
    title: "Total Doctors",
    value: "Doctor Records",
    icon: Stethoscope,
    description: "Overview of managed doctors",
  },
  {
    title: "Total Patients",
    value: "Patient Records",
    icon: Users,
    description: "Overview of registered patients",
  },
  {
    title: "Patient Assignments",
    value: "Doctor Relations",
    icon: ClipboardList,
    description: "Patients linked with doctors",
  },
];

const barData = [
  { label: "Mon", height: "42%" },
  { label: "Tue", height: "65%" },
  { label: "Wed", height: "52%" },
  { label: "Thu", height: "82%" },
  { label: "Fri", height: "60%" },
  { label: "Sat", height: "92%" },
  { label: "Sun", height: "72%" },
];

const distribution = [
  { label: "General Medicine", width: "78%" },
  { label: "Cardiology", width: "58%" },
  { label: "Neurology", width: "43%" },
  { label: "Pediatrics", width: "66%" },
];

export default function DashboardAnalytics() {
  return (
    <section className="relative overflow-hidden bg-green-50/60 py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700">
            <ChartNoAxesCombined size={16} />
            Dashboard Analytics
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Understand your platform with{" "}
            <span className="text-green-600">clear insights.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Get a clear overview of doctors, patients, and their assignments.
            Use dashboard analytics to understand your platform's data across
            different time periods.
          </p>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-green-950/5 sm:p-6"
          >
            {/* Preview header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Admin Dashboard
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Platform overview preview
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                <CalendarDays size={14} className="text-green-600" />
                Date filters
              </div>
            </div>

            {/* Overview cards */}
            <div className="grid gap-3 sm:grid-cols-3">
              {overviewCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <Icon size={18} />
                    </div>
                    <p className="text-xs font-medium text-slate-500">
                      {card.title}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {card.value}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-400">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Chart preview */}
            <div className="mt-5 rounded-xl border border-slate-100 p-4">
              <div className="mb-5 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Patient Statistics
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Sample chart visualization
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  <BarChart3 size={17} />
                </div>
              </div>

              <div className="flex h-36 items-end justify-between gap-2 border-b border-slate-100 px-1 sm:gap-4">
                {barData.map((bar, index) => (
                  <div
                    key={bar.label}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: bar.height }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.08,
                        ease: "easeOut",
                      }}
                      className="w-full max-w-8 rounded-t-md bg-green-500"
                    />
                    <span className="text-[10px] text-slate-400">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution preview */}
            <div className="mt-5 rounded-xl border border-slate-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-800">
                  Doctor Specialization
                </p>
                <Activity size={17} className="text-green-600" />
              </div>

              <div className="space-y-4">
                {distribution.map((item, index) => (
                  <div key={item.label}>
                    <div className="mb-1.5 flex justify-between gap-2 text-xs">
                      <span className="font-medium text-slate-600">
                        {item.label}
                      </span>
                      <span className="text-slate-400">Preview</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.width }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.1,
                        }}
                        className="h-full rounded-full bg-green-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-400">
              Illustrative dashboard preview — not live application data
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <h3 className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
              Everything important,{" "}
              <span className="text-green-600">in one dashboard.</span>
            </h3>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Monitor your doctor and patient management activities through
              structured analytics. Filter dashboard data by date and explore
              useful statistics from a single admin interface.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Users size={21} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Doctor & Patient Statistics
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    View doctor statistics, patient statistics, and overall
                    management information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <ChartNoAxesCombined size={21} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Visual Data Analytics
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Understand patient distribution and patients assigned to
                    individual doctors through charts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <CalendarDays size={21} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    Flexible Date Filters
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Explore dashboard analytics using daily, monthly, and yearly
                    date filters.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-9 rounded-xl border border-green-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  <Activity size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Make data easier to understand
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Turn management records into meaningful visual insights and
                    keep track of your platform from one place.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import {
  Activity,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Users,
} from "lucide-react";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Secure Admin Access",
    description:
      "A protected administrative portal keeps doctor and patient management accessible to authorized users.",
  },
  {
    icon: Users,
    title: "Doctor Management",
    description:
      "Create, update, search, and organize doctor profiles from one centralized place.",
  },
  {
    icon: ClipboardList,
    title: "Patient Management",
    description:
      "Maintain patient records, medical history, and doctor assignments in an organized workflow.",
  },
  {
    icon: Activity,
    title: "Dashboard Analytics",
    description:
      "Understand doctor and patient statistics through visual reports and date-based filters.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <HeartPulse size={16} />
            About Doctor Tracker
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Simplifying Healthcare
            <span className="block text-green-600">Record Management</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            Doctor Tracker is a centralized administrative platform designed to
            make doctor and patient record management easier, more organized,
            and more efficient. It helps administrators manage healthcare
            records and monitor important statistics from one place.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-green-100 bg-green-50/70 p-7 text-center sm:p-9"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-green-600 shadow-sm">
            <HeartPulse size={27} />
          </div>

          <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Organized Records, Better Management
          </h3>

          <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Our goal is to provide administrators with a simple and reliable way
            to manage healthcare records, connect patients with doctors, and
            make informed decisions through dashboard insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

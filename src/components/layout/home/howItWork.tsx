
"use client";

import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  LogIn,
  Stethoscope,
  Users,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Admin Login",
    description:
      "Sign in securely to access the Doctor Tracker admin dashboard and management features.",
    icon: LogIn,
  },
  {
    number: "02",
    title: "Add Doctors",
    description:
      "Create doctor profiles with their name, specialization, hospital, phone number, and email.",
    icon: Stethoscope,
  },
  {
    number: "03",
    title: "Register Patients",
    description:
      "Add patient information, contact details, health conditions, and medical history.",
    icon: Users,
  },
  {
    number: "04",
    title: "Assign Patients",
    description:
      "Connect patients with doctors and manage their assigned patient lists from the dashboard.",
    icon: ClipboardList,
  },
  {
    number: "05",
    title: "Monitor Analytics",
    description:
      "Explore dashboard statistics, patient distribution, and management insights with date filters.",
    icon: LayoutDashboard,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-green-50 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-green-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <CheckCircle2 size={16} />
            How It Works
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Simple steps to{" "}
            <span className="text-green-600">organized management.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            From secure admin access to data-driven insights, manage your
            doctors and patients through a simple and structured workflow.
          </p>
        </motion.div>

        {/* Workflow */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div className="absolute left-[9.5%] right-[9.5%] top-10 hidden h-0.5 bg-green-100 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  className="relative"
                >
                  <div className="relative z-10 mb-6 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-green-200 bg-white text-green-700 shadow-lg shadow-green-950/5 transition duration-300 hover:-translate-y-1 hover:bg-green-600 hover:text-white">
                      <Icon size={30} strokeWidth={1.8} />
                    </div>

                    <span className="absolute -right-1 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-green-600 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>

                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-950/5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold tracking-widest text-green-600">
                        STEP {step.number}
                      </span>
                      {index !== steps.length - 1 && (
                        <ArrowRight
                          size={16}
                          className="hidden text-green-500 lg:block"
                        />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile/tablet flow indicator */}
                  {index !== steps.length - 1 && (
                    <div className="my-2 flex justify-center text-green-500 sm:hidden">
                      <ArrowDown size={20} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex flex-col items-center justify-between gap-5 rounded-2xl border border-green-200 bg-green-50 p-6 sm:flex-row sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
              <CheckCircle2 size={24} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                One platform, organized workflow
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                Keep doctor records, patient information, assignments, and
                analytics connected through a centralized admin portal.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-green-700">
            <span>Simple & Organized</span>
            <ArrowRight size={17} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

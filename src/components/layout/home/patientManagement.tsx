"use client";

import { motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  CalendarDays,
  ClipboardList,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const features = [
  {
    icon: UserRound,
    title: "Patient Registration",
    description:
      "Add and maintain patient profiles with essential personal and contact information.",
  },
  {
    icon: ClipboardList,
    title: "Medical History",
    description:
      "Keep important medical history and condition details organized in each patient record.",
  },
  {
    icon: HeartPulse,
    title: "Condition Tracking",
    description:
      "View a patient's recorded health condition while managing their profile.",
  },
  {
    icon: Users,
    title: "Doctor Assignment",
    description:
      "Assign patients to doctors and manage those relationships from one place.",
  },
];

const samplePatients = [
  {
    initials: "NL",
    name: "Norman Levy",
    email: "norman@example.com",
    condition: "Hypertension",
    doctor: "Dr. Sarah Wilson",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "EM",
    name: "Emma Mitchell",
    email: "emma@example.com",
    condition: "Diabetes",
    doctor: "Dr. James Carter",
    color: "bg-green-100 text-green-700",
  },
  {
    initials: "JW",
    name: "James Wilson",
    email: "james@example.com",
    condition: "Asthma",
    doctor: "Not assigned",
    color: "bg-lime-100 text-lime-700",
  },
];

export default function PatientManagement() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-green-50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Patient directory preview */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="order-2 lg:order-1"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-green-950/5 sm:p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-slate-900">
                  Patient Directory
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Manage patient records in one place
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Users size={20} />
              </div>
            </div>

            <div className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
              <Search size={17} className="text-slate-400" />
              <span className="text-sm text-slate-400">Search patients...</span>
            </div>

            <div className="space-y-3">
              {samplePatients.map((patient, index) => (
                <motion.div
                  key={patient.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12, duration: 0.4 }}
                  className="rounded-xl border border-slate-100 bg-white p-3 transition hover:border-green-200 hover:bg-green-50/40 sm:p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${patient.color}`}
                    >
                      {patient.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-slate-900">
                          {patient.name}
                        </p>
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          {patient.condition}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail size={12} />
                          {patient.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserRound size={12} />
                          {patient.doctor}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-500">
                Illustrative patient records
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
                Organized records <ShieldCheck size={14} />
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Keep patient information organized
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Manage profiles and doctor assignments from the admin portal.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="order-1 lg:order-2"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <Users size={16} />
            Patient Management
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Patient records,{" "}
            <span className="text-green-600">managed with clarity.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            Keep patient information organized with a centralized management
            system. Create patient profiles, maintain medical history, and
            connect patients with their assigned doctors.
          </p>

          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">
                    <Icon size={21} />
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-9 border-t border-slate-100 pt-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                <ShieldCheck size={17} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Centralized administration
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Authorized administrators can manage patient records and
                  assignments through a protected dashboard.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

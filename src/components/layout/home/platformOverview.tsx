"use client";

import {
  Stethoscope,
  Users,
  UserRoundCheck,
  ChartNoAxesCombined,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

const platformFeatures = [
  {
    id: 1,
    title: "Doctor Management",
    description:
      "Create, update, and organize doctor profiles with specialization, hospital, contact details, and professional information.",
    icon: Stethoscope,
    tag: "Doctor Records",
    className: "bg-green-50 text-green-700",
  },
  {
    id: 2,
    title: "Patient Management",
    description:
      "Maintain organized patient records, including personal information, medical conditions, and medical history.",
    icon: Users,
    tag: "Patient Records",
    className: "bg-blue-50 text-blue-700",
  },
  {
    id: 3,
    title: "Patient Assignment",
    description:
      "Assign patients to doctors, view doctor-wise patient lists, and manage patient assignments from one place.",
    icon: UserRoundCheck,
    tag: "Doctor & Patient",
    className: "bg-purple-50 text-purple-700",
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    description:
      "Monitor doctors, patients, patient distribution, and statistics through interactive charts and date-based analytics.",
    icon: ChartNoAxesCombined,
    tag: "Insights & Reports",
    className: "bg-orange-50 text-orange-700",
  },
];

const PlatOverview = () => {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold tracking-wide text-green-700">
            <ShieldCheck size={15} />
            ONE PLATFORM, COMPLETE CONTROL
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Everything You Need to
            <span className="text-green-600"> Manage Better</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
            Doctor Tracker brings doctor management, patient records,
            assignments, and analytics together in one organized administrative
            platform.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platformFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl hover:shadow-green-900/5"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div
                    className={`flex size-12 items-center justify-center rounded-xl ${feature.className}`}
                  >
                    <Icon size={24} />
                  </div>

                  <span className="text-xs font-semibold text-muted-foreground">
                    0{feature.id}
                  </span>
                </div>

                <span className="mb-3 w-fit rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {feature.tag}
                </span>

                <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="flex-1 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium text-muted-foreground">
                    Explore feature
                  </span>

                  <div className="flex size-8 items-center justify-center rounded-full bg-muted transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50/70 p-6 text-center sm:flex-row sm:text-left lg:px-8"
        >
          <div>
            <h3 className="text-lg font-bold text-foreground">
              Simplify Your Daily Administration
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep doctor and patient information organized from one place.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-green-700">
            <ShieldCheck size={18} />
            Secure Admin Access
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatOverview;

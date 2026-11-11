
"use client";

import { motion } from "motion/react";
import {
  Stethoscope,
  Search,
  Hospital,
  ClipboardList,
  CalendarDays,
  ArrowRight,
  UserRoundPlus,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: UserRoundPlus,
    title: "Create Doctor Profiles",
    description:
      "Add doctors with their name, specialization, hospital, phone number, and email address.",
  },
  {
    icon: ClipboardList,
    title: "Manage Doctor Records",
    description:
      "Update doctor information and maintain organized professional records.",
  },
  {
    icon: Search,
    title: "Search & Filter Doctors",
    description:
      "Find doctors quickly using search, specialization, and date-based filters.",
  },
  {
    icon: Hospital,
    title: "Hospital Information",
    description:
      "Keep hospital affiliations and doctor contact information accessible in one place.",
  },
];

const DoctorManagement = () => {
  return (
    <section
      id="doctors"
      className="overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
            <Stethoscope size={15} />
            DOCTOR MANAGEMENT
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Manage Your Doctors
            <span className="text-green-600"> With Confidence</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Keep all your doctor information organized in one place.
            Doctor Tracker makes it easier to create profiles, manage
            professional details, and find doctors whenever you need them.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  className="flex gap-3"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                    <Icon size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
            <CheckCircle2 size={17} className="text-green-600" />
            <span>Organized records</span>
            <span className="text-border">•</span>
            <CheckCircle2 size={17} className="text-green-600" />
            <span>Easy management</span>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-green-200/40 blur-3xl" />

          <div className="relative rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-green-900/5 sm:p-7">
            {/* Preview Header */}
            <div className="flex items-center justify-between gap-3 border-b border-border pb-5">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  DOCTOR DIRECTORY
                </p>
                <h3 className="mt-1 text-xl font-bold text-foreground">
                  Doctor Records
                </h3>
              </div>

              <div className="flex size-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Stethoscope size={22} />
              </div>
            </div>

            {/* Search Preview */}
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-muted/50 px-4 py-3">
              <Search size={17} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Search doctors...
              </span>
            </div>

            {/* Doctor Preview Cards */}
            <div className="mt-5 space-y-3">
              {[
                {
                  name: "Dr. Sarah Ahmed",
                  specialization: "Cardiologist",
                  hospital: "City Medical Center",
                  initials: "SA",
                },
                {
                  name: "Dr. James Wilson",
                  specialization: "Neurologist",
                  hospital: "Central Hospital",
                  initials: "JW",
                },
                {
                  name: "Dr. Emily Carter",
                  specialization: "Dermatologist",
                  hospital: "Green Life Hospital",
                  initials: "EC",
                },
              ].map((doctor, index) => (
                <motion.div
                  key={doctor.name}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.12,
                  }}
                  className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-green-300 hover:bg-green-50/40"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {doctor.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-foreground">
                      {doctor.name}
                    </h4>
                    <p className="mt-0.5 text-xs text-green-700">
                      {doctor.specialization}
                    </p>
                    <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-muted-foreground">
                      <Hospital size={12} />
                      {doctor.hospital}
                    </p>
                  </div>

                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-green-600"
                  />
                </motion.div>
              ))}
            </div>

            {/* Preview Footer */}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-green-50 p-4">
              <div>
                <p className="text-xs font-medium text-green-700">
                  Doctor Directory
                </p>
                <p className="mt-1 text-xs text-green-700/70">
                  Search and manage doctor records
                </p>
              </div>

              <ArrowRight size={20} className="text-green-700" />
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-lg sm:-left-6">
            <div className="flex size-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
              <CalendarDays size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">
                Easy Filtering
              </p>
              <p className="text-[10px] text-muted-foreground">
                Find doctors faster
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DoctorManagement;

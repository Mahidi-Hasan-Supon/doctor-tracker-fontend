"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  HeartPulse,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { useGetAllDoctors } from "@/hooks";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DoctorCardSkeleton from "../doctor-card-skeleton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};

const PublicDoctorPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useGetAllDoctors({
    search,
    page,
    limit: 6,
  });

  const doctors = data?.data ?? [];
  const meta = data?.meta;

  return (
    <section className="relative min-h-screen overflow-hidden bg-background py-16 sm:py-20">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-96 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl space-y-6 text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Your Health, Our Priority
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Meet Our Expert{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Doctors
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Find experienced healthcare professionals and discover the right
            specialist for your health and wellness journey.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HeartPulse className="h-6 w-6" />
            </div>

            <div className="text-left">
              <p className="text-sm font-semibold">Trusted Healthcare</p>
              <p className="text-xs text-muted-foreground">
                Professional care starts here
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-2xl border bg-card/80 p-3 shadow-lg shadow-primary/5 backdrop-blur-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search doctors, specialization or hospital..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                className="h-12 border-0 bg-transparent pl-12 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
        </motion.div>

        {/* Section Heading */}
        {!isPending && !isError && (
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Medical Professionals
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Our Healthcare Specialists
              </h2>

              <p className="text-sm text-muted-foreground">
                Browse our registered medical professionals.
              </p>
            </div>

            <div className="rounded-xl border bg-card px-5 py-3">
              <p className="text-xs text-muted-foreground">Total Doctors</p>
              <p className="text-2xl font-bold text-primary">
                {meta?.total ?? 0}
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {isPending && <DoctorCardSkeleton />}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-10 text-center">
            <p className="font-medium text-destructive">
              Failed to load doctors. Please try again.
            </p>
          </div>
        )}

        {/* Doctor Cards */}
        {!isPending && !isError && (
          <>
            {doctors.length > 0 ? (
              <motion.div
                key={`${search}-${page}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {doctors.map((doctor) => (
                  <motion.div
                    key={doctor._id}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.25 },
                    }}
                    className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                  >
                    {/* Decorative Background */}
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/15" />

                    {/* Card Header */}
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-emerald-500/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:from-primary group-hover:to-emerald-500 group-hover:text-white">
                        <Stethoscope className="h-8 w-8" />
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:text-primary">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Doctor Name */}
                    <div className="relative mt-6 space-y-2">
                      <h3 className="text-xl font-bold tracking-tight">
                        {doctor.name}
                      </h3>

                      <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {doctor.specialization}
                      </span>
                    </div>

                    {/* Doctor Details */}
                    <div className="relative mt-6 space-y-4 border-t pt-5">
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{doctor.hospital}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 shrink-0 text-primary" />
                        <span>{doctor.phone}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 shrink-0 text-primary" />
                        <span className="break-all">{doctor.email}</span>
                      </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500 group-hover:w-full" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="rounded-2xl border bg-card py-16 text-center">
                <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground" />

                <h3 className="mt-4 text-xl font-bold">No Doctors Found</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try searching with a different name or specialization.
                </p>
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.max(1, current - 1));
                      }}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: meta.totalPages },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        isActive={page === pageNumber}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(pageNumber);
                        }}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) =>
                          Math.min(meta.totalPages, current + 1),
                        );
                      }}
                      className={
                        page === meta.totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default PublicDoctorPage;

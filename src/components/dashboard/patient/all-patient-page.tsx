
"use client";

import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";

import { useGetAllPatients, useGetAllDoctors } from "@/hooks";

import PatientTable from "./patient-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PatientPageSkeleton from "./patient-skeleton";

const AllPatientPage = () => {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [gender, setGender] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const limit = 3;

  const {
    data: patientResponse,
    isLoading,
    isError,
  } = useGetAllPatients({
    search,
    condition,
    gender: gender as "MALE" | "FEMALE" | undefined,
    doctorId,
    startDate,
    endDate,
    page,
    limit,
  });

  const { data: doctorResponse } = useGetAllDoctors({
    limit: 100,
  });

  const patients = patientResponse?.data ?? [];
  const meta = patientResponse?.meta;
  const doctors = doctorResponse?.data ?? [];

  // Reset Filters
  const handleResetFilters = () => {
    setSearch("");
    setCondition("");
    setGender("");
    setDoctorId("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          All Patients
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage, search and filter all registered patients.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 rounded-xl border bg-card p-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search by patient name, email or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* Condition */}
          <Input
            placeholder="Filter by condition"
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
              setPage(1);
            }}
          />

          {/* Gender */}
          <select
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All Genders</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          {/* Doctor */}
          <select
            value={doctorId}
            onChange={(e) => {
              setDoctorId(e.target.value);
              setPage(1);
            }}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            <option value="">All Doctors</option>

            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>

          {/* Start Date */}
          <Input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setPage(1);
            }}
            aria-label="Start date"
          />

          {/* End Date */}
          <Input
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => {
              setEndDate(e.target.value);
              setPage(1);
            }}
            aria-label="End date"
          />
        </div>

        {/* Reset Filters */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
          >
            <RotateCcw className="mr-2 size-4" />
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Patient Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Total Patients:{" "}
          <span className="font-semibold text-foreground">
            {meta?.total ?? 0}
          </span>
        </p>
      </div>

      {/* Patient Table / Skeleton / Error */}
      {isLoading ? (
        <PatientPageSkeleton />
      ) : isError ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="text-sm text-destructive">
            Failed to load patients. Please try again.
          </p>
        </div>
      ) : (
        <PatientTable patients={patients} />
      )}

      {/* Pagination */}
      {!isLoading && !isError && meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPatientPage;

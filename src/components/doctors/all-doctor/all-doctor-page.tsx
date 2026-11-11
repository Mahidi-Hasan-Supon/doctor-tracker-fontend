
"use client";

import { useState } from "react";
import { useGetAllDoctors } from "@/hooks";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import DoctorTable from "./doctor-table-page";

const AllDoctorPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending, isError } = useGetAllDoctors({
    search,
    page,
    limit: 2,
  });

  const doctors = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          All Doctors
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage all registered doctors.
        </p>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          Total Doctors: {meta?.total ?? 0}
        </p>

        <Input
          placeholder="Search doctors..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="sm:max-w-sm"
        />
      </div>

      {isPending ? (
        <div className="space-y-4 rounded-xl border p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={Number(index)} className="flex gap-4">
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 flex-1" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border p-8 text-center text-destructive">
          Failed to load doctors. Please try again.
        </div>
      ) : doctors.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          <p className="font-medium">No doctors found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another search keyword.
          </p>
        </div>
      ) : (
        <DoctorTable doctors={doctors} />
      )}

      {!isPending && !isError && totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing page {page} of {totalPages}
          </p>

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
                    page <= 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from(
                { length: totalPages },
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
                      Math.min(totalPages, current + 1),
                    );
                  }}
                  className={
                    page >= totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default AllDoctorPage;

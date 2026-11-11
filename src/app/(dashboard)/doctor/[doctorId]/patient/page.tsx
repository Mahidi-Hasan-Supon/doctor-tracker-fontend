
"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Stethoscope,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  useGetPatientsByDoctor,
  useRemovePatientFromDoctor,
} from "@/hooks";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DoctorPatientsPageProps {
  params: Promise<{
    doctorId: string;
  }>;
}

interface SelectedPatient {
  _id: string;
  name: string;
}

const DoctorPatientsPage = ({ params }: DoctorPatientsPageProps) => {
  const { doctorId } = use(params);

  const [selectedPatient, setSelectedPatient] =
    useState<SelectedPatient | null>(null);

  const {
    data: patientResponse,
    isLoading,
    isError,
  } = useGetPatientsByDoctor(doctorId, {
    page: 1,
    limit: 10,
  });

  const removePatientMutation = useRemovePatientFromDoctor();

  const patients = patientResponse?.data?.data ?? [];
  const totalPatients = patientResponse?.data?.meta?.total ?? 0;

  const handleRemovePatient = () => {
    if (!selectedPatient) return;

    removePatientMutation.mutate(
      {
        doctorId,
        patientId: selectedPatient._id,
      },
      {
        onSuccess: () => {
          toast.success("Patient removed from doctor successfully");
          setSelectedPatient(null);
        },
        onError: () => {
          toast.error("Failed to remove patient. Please try again.");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">
              Doctor's Patients
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            View and manage patients assigned to this doctor.
          </p>
        </div>

        <Button variant="outline">
          <Link href="/doctor/all-doctor">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Doctors
          </Link>
        </Button>
      </div>

      {/* Patient Count */}
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Users className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Patients</p>

            {isLoading ? (
              <Skeleton className="mt-1 h-7 w-12" />
            ) : (
              <h2 className="text-2xl font-bold">{totalPatients}</h2>
            )}
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-5">
          <h2 className="font-semibold">Patient List</h2>
          <p className="text-sm text-muted-foreground">
            Patients assigned to this doctor.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4 p-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={Number(index)} className="h-12 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-sm text-destructive">
            Failed to load patients. Please try again.
          </div>
        ) : patients.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <p className="font-medium">No patients found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              No patients are currently assigned to this doctor.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b text-left">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Condition</th>
                  <th className="px-5 py-3 font-medium">Added Date</th>
                  <th className="px-5 py-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id} className="border-b last:border-0">
                    <td className="px-5 py-4 font-medium">
                      {patient.name}
                    </td>

                    <td className="px-5 py-4">{patient.email}</td>

                    <td className="px-5 py-4">{patient.phone}</td>

                    <td className="px-5 py-4">{patient.condition}</td>

                    <td className="px-5 py-4">
                      {new Date(patient.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          setSelectedPatient({
                            _id: patient._id,
                            name: patient.name,
                          })
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Remove Confirmation Dialog */}
      <AlertDialog
        open={!!selectedPatient}
        onOpenChange={(open) => {
          if (!open && !removePatientMutation.isPending) {
            setSelectedPatient(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Patient?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                {selectedPatient?.name}
              </span>{" "}
              from this doctor's patient list? The patient record will not be
              deleted and will remain available in All Patients.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={removePatientMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={removePatientMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                handleRemovePatient();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removePatientMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Yes, Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DoctorPatientsPage;

"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { IPatient, UpdatePatientPayload } from "@/types";
import { useDeletePatient, useUpdatePatient } from "@/hooks";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
import PatientTableSkeleton from "./patient-skeleton";

interface PatientTableProps {
  patients: IPatient[];
}

const PatientTable = ({ patients }: PatientTableProps) => {
  const updateMutation = useUpdatePatient();
  const deleteMutation = useDeletePatient();

  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const [patientToDelete, setPatientToDelete] = useState<IPatient | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "MALE" as "MALE" | "FEMALE",
    address: "",
    condition: "",
    medicalHistory: "",
  });

  // Open Edit Sheet
  const handleEdit = (patient: IPatient) => {
    setSelectedPatient(patient);

    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      age: String(patient.age),
      gender: patient.gender,
      address: patient.address,
      condition: patient.condition,
      medicalHistory: patient.medicalHistory ?? "",
    });
  };

  // Update Patient
  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPatient) return;

    const payload: UpdatePatientPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      gender: formData.gender,
      address: formData.address,
      condition: formData.condition,
      medicalHistory: formData.medicalHistory,
    };

    updateMutation.mutate(
      {
        patientId: selectedPatient._id,
        payload,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Patient updated successfully");
          setSelectedPatient(null);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update patient");
        },
      },
    );
  };

  // Delete Patient
  const handleDelete = () => {
    if (!patientToDelete) return;

    deleteMutation.mutate(patientToDelete._id, {
      onSuccess: (response) => {
        toast.success(response.message || "Patient deleted successfully");
        setPatientToDelete(null);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete patient");
      },
    });
  };

  return (
    <>
      {/* Patient Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Added Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.condition}</TableCell>

                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {patient.doctorId?.name ?? "N/A"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {patient.doctorId?.specialization ?? ""}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    {new Date(patient.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(patient)}
                        aria-label="Edit patient"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setPatientToDelete(patient)}
                        aria-label="Delete patient"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-muted-foreground"
                >
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Patient Sheet */}
      <Sheet
        open={!!selectedPatient}
        onOpenChange={(open) => {
          if (!open) setSelectedPatient(null);
        }}
      >
        <SheetContent side="right" className="overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Edit Patient</SheetTitle>
            <SheetDescription>Update patient information.</SheetDescription>
          </SheetHeader>

          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as "MALE" | "FEMALE",
                    })
                  }
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Condition</Label>
              <Input
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Medical History</Label>
              <Textarea
                value={formData.medicalHistory}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    medicalHistory: e.target.value,
                  })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Updating..." : "Update Patient"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!patientToDelete}
        onOpenChange={(open) => {
          if (!open) setPatientToDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Patient?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{patientToDelete?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={deleteMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PatientTable;


"use client";

import { useState } from "react";
import type { IDoctor } from "@/types";
import { useDeleteDoctor } from "@/hooks";
import { toast } from "sonner";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpdateDoctor } from "@/hooks";
import { useForm } from "@tanstack/react-form";
import { createDoctorSchema } from "@/validation";

import { Pencil, Trash2 } from "lucide-react";

interface DoctorTableProps {
  doctors: IDoctor[];
}

// Edit Doctor Sheet
const EditDoctorSheet = ({
  doctor,
  open,
  onOpenChange,
}: {
  doctor: IDoctor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const updateDoctorMutation = useUpdateDoctor();

  if (!doctor) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Edit Doctor</SheetTitle>
          <SheetDescription>
            Update the doctor's information below.
          </SheetDescription>
        </SheetHeader>

        <EditDoctorForm
          key={doctor._id}
          doctor={doctor}
          onOpenChange={onOpenChange}
          updateDoctorMutation={updateDoctorMutation}
        />
      </SheetContent>
    </Sheet>
  );
};

// Edit Form
const EditDoctorForm = ({
  doctor,
  onOpenChange,
  updateDoctorMutation,
}: {
  doctor: IDoctor;
  onOpenChange: (open: boolean) => void;
  updateDoctorMutation: ReturnType<typeof useUpdateDoctor>;
}) => {
  const form = useForm({
    defaultValues: {
      name: doctor.name,
      specialization: doctor.specialization,
      hospital: doctor.hospital,
      phone: doctor.phone,
      email: doctor.email,
    },
    validators: {
      onSubmit: createDoctorSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateDoctorMutation.mutateAsync({
          doctorId: doctor._id,
          payload: value,
        });

        toast.success("Doctor updated successfully!");
        onOpenChange(false);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update doctor",
        );
      }
    },
  });

  const fields = [
    { name: "name", label: "Doctor Name", type: "text" },
    { name: "specialization", label: "Specialization", type: "text" },
    { name: "hospital", label: "Hospital", type: "text" },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
  ] as const;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-5 px-4 pb-6"
    >
      {fields.map((item) => (
        <form.Field key={item.name} name={item.name}>
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name}>{item.label}</Label>

              <Input
                id={field.name}
                type={item.type}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.value)
                }
              />

              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors
                    .map((error) =>
                      typeof error === "string"
                        ? error
                        : error?.message,
                    )
                    .join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>
      ))}

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full"
            disabled={
              !canSubmit ||
              isSubmitting ||
              updateDoctorMutation.isPending
            }
          >
            {isSubmitting || updateDoctorMutation.isPending
              ? "Updating..."
              : "Update Doctor"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};

// Main Doctor Table
const DoctorTable = ({ doctors }: DoctorTableProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteDoctorMutation = useDeleteDoctor();

  const handleDelete = async () => {
    if (!selectedDoctor) return;

    try {
      await deleteDoctorMutation.mutateAsync(selectedDoctor._id);

      toast.success("Doctor deleted successfully!");
      setDeleteOpen(false);
      setSelectedDoctor(null);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete doctor",
      );
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell className="font-medium">
                  {doctor.name}
                </TableCell>

                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.hospital}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.email}</TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      title="Edit doctor"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setEditOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="destructive"
                      title="Delete doctor"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setDeleteOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {doctors.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground"
                >
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Sheet */}
      <EditDoctorSheet
        doctor={selectedDoctor}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this doctor?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. Doctor{" "}
              <strong>{selectedDoctor?.name}</strong> will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteDoctorMutation.isPending}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
              disabled={deleteDoctorMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteDoctorMutation.isPending
                ? "Deleting..."
                : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DoctorTable;

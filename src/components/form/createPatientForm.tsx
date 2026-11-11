
"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useCreatePatient, useGetAllDoctors } from "@/hooks";
import { createPatientSchema } from "@/validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreatePatientForm = () => {
  const { data: doctorResponse, isLoading: doctorsLoading } =
    useGetAllDoctors({ limit: 100 });

  const createPatientMutation = useCreatePatient();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 0,
      gender: "MALE" as "MALE" | "FEMALE",
      address: "",
      condition: "",
      medicalHistory: "",
      doctorId: "",
    },
    validators: {
      onSubmit: createPatientSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createPatientMutation.mutateAsync(value);
        toast.success("Patient created successfully!");
        form.reset();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create patient",
        );
      }
    },
  });

  const doctors = doctorResponse?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border bg-card p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Create Patient</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new patient and assign a doctor.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {(
            [
              ["name", "Full Name", "Enter patient name"],
              ["email", "Email", "Enter email address"],
              ["phone", "Phone Number", "Enter phone number"],
              ["address", "Address", "Enter address"],
              ["condition", "Patient Condition", "Enter condition"],
            ] as const
          ).map(([name, label, placeholder]) => (
            <form.Field key={name} name={name}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    placeholder={placeholder}
                    value={field.state.value}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <form.Field name="age">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="120"
                  value={String(field.state.value)}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="gender">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(
                      event.target.value as "MALE" | "FEMALE",
                    )
                  }
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="doctorId">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="doctorId">Assign Doctor</Label>
              <select
                id="doctorId"
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                value={field.state.value}
                disabled={doctorsLoading}
                onChange={(event) =>
                  field.handleChange(event.target.value)
                }
              >
                <option value="">
                  {doctorsLoading ? "Loading doctors..." : "Select a doctor"}
                </option>

                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="medicalHistory">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">
                Medical History (Optional)
              </Label>
              <Textarea
                id="medicalHistory"
                placeholder="Enter patient's medical history"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(event.target.value)
                }
              />
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          className="w-full"
          disabled={createPatientMutation.isPending}
        >
          {createPatientMutation.isPending
            ? "Creating Patient..."
            : "Create Patient"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePatientForm;

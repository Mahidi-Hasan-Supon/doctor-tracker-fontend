
"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { useCreateDoctor } from "@/hooks";
import { createDoctorSchema } from "@/validation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateDoctorForm = () => {
  const createDoctorMutation = useCreateDoctor();

  const form = useForm({
    defaultValues: {
      name: "",
      specialization: "",
      hospital: "",
      phone: "",
      email: "",
    },
    validators: {
      onSubmit: createDoctorSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createDoctorMutation.mutateAsync(value);
        toast.success("Doctor created successfully!");
        form.reset();
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to create doctor",
        );
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {(
          [
            { name: "name", label: "Doctor Name", placeholder: "Enter doctor name" },
            { name: "specialization", label: "Specialization", placeholder: "e.g. Cardiologist" },
            { name: "hospital", label: "Hospital", placeholder: "Enter hospital name" },
            { name: "phone", label: "Phone Number", placeholder: "Enter phone number" },
            { name: "email", label: "Email Address", placeholder: "doctor@example.com" },
          ] as const
        ).map((fieldConfig) => (
          <form.Field key={fieldConfig.name} name={fieldConfig.name}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>
                  {fieldConfig.label}
                </Label>

                <Input
                  id={field.name}
                  type={field.name === "email" ? "email" : "text"}
                  placeholder={fieldConfig.placeholder}
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
      </div>

      <form.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
        ]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting || createDoctorMutation.isPending}
          >
            {isSubmitting || createDoctorMutation.isPending
              ? "Creating..."
              : "Create Doctor"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default CreateDoctorForm;

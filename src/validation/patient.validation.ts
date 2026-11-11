
import { z } from "zod";

export const createPatientSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z.string().email("Please enter a valid email"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot exceed 15 characters"),

  age: z.number().min(0, "Age cannot be negative").max(120),

  gender: z.enum(["MALE", "FEMALE"]),

  address: z.string().min(5, "Address must be at least 5 characters"),

  condition: z.string().min(2, "Condition is required"),

  medicalHistory: z.string(),

  doctorId: z.string().min(1, "Please select a doctor"),
});

export type CreatePatientFormValues = z.infer<
  typeof createPatientSchema
>;

export const updatePatientSchema = createPatientSchema.partial();

export type UpdatePatientFormValues = z.infer<
  typeof updatePatientSchema
>;

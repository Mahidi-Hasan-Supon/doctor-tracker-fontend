import { z } from "zod";

export const createDoctorSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  specialization: z.string().min(2, "Specialization is required"),

  hospital: z.string().min(2, "Hospital name is required"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot exceed 15 characters"),

  email: z.string().email("Please enter a valid email"),
});

export type CreateDoctorFormValues = z.infer<typeof createDoctorSchema>;

export const updateDoctorSchema = createDoctorSchema.partial();

export type UpdateDoctorFormValues = z.infer<typeof updateDoctorSchema>;

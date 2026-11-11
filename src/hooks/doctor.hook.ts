
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  updateDoctor,
} from "@/api/doctor.api";

import type {
  CreateDoctorPayload,
  DoctorQueryParams,
  UpdateDoctorPayload,
} from "@/types";

// Get All Doctors
export const useGetAllDoctors = (params?: DoctorQueryParams) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: () => getAllDoctors(params),
  });
};

// Get Single Doctor
export const useGetSingleDoctor = (doctorId: string) => {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () => getSingleDoctor(doctorId),
    enabled: !!doctorId,
  });
};

// Create Doctor
export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) =>
      createDoctor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

// Update Doctor
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      payload,
    }: {
      doctorId: string;
      payload: UpdateDoctorPayload;
    }) => updateDoctor(doctorId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({
        queryKey: ["doctor", variables.doctorId],
      });
    },
  });
};

// Delete Doctor
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (doctorId: string) => deleteDoctor(doctorId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

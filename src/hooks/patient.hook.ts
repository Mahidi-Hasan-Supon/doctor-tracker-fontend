
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientsByDoctor,
  getSinglePatient,
  removePatientFromDoctor,
  updatePatient,
} from "@/api/patient.api";

import type {
  CreatePatientPayload,
  PatientQueryParams,
  UpdatePatientPayload,
} from "@/types";

// Get All Patients
export const useGetAllPatients = (params?: PatientQueryParams) =>
  useQuery({
    queryKey: ["patients", params],
    queryFn: () => getAllPatients(params),
  });

// Get Single Patient
export const useGetSinglePatient = (patientId: string) =>
  useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getSinglePatient(patientId),
    enabled: !!patientId,
  });

// Get Patients By Doctor
export const useGetPatientsByDoctor = (
  doctorId: string,
  params?: Omit<PatientQueryParams, "doctorId" | "startDate" | "endDate">,
) =>
  useQuery({
    queryKey: ["patients", "doctor", doctorId, params],
    queryFn: () => getPatientsByDoctor(doctorId, params),
    enabled: !!doctorId,
  });

// Create Patient
export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload) =>
      createPatient(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

// Update Patient
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      patientId,
      payload,
    }: {
      patientId: string;
      payload: UpdatePatientPayload;
    }) => updatePatient(patientId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({
        queryKey: ["patient", variables.patientId],
      });
    },
  });
};

// Delete Patient
export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (patientId: string) => deletePatient(patientId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

// Remove Patient From Doctor
export const useRemovePatientFromDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      patientId,
    }: {
      doctorId: string;
      patientId: string;
    }) => removePatientFromDoctor(doctorId, patientId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

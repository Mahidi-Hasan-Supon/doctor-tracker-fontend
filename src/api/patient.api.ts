
import apiClient from "@/lib/apiClient";

import type {
  CreatePatientPayload,
  IPatient,
  PatientPaginationMeta,
  PatientQueryParams,
  UpdatePatientPayload,
} from "@/types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PatientListResponse {
  success: boolean;
  message: string;
  meta: PatientPaginationMeta;
  data: IPatient[];
}

// Create Patient
export const createPatient = (payload: CreatePatientPayload) =>
  apiClient<ApiResponse<IPatient>>("/patients", {
    method: "POST",
    body: payload,
  });

// Get All Patients
export const getAllPatients = (params?: PatientQueryParams) =>
  apiClient<PatientListResponse>("/patients", {
    method: "GET",
    query: params,
  });

// Get Single Patient
export const getSinglePatient = (patientId: string) =>
  apiClient<ApiResponse<IPatient>>(`/patients/${patientId}`, {
    method: "GET",
  });

// Update Patient
export const updatePatient = (
  patientId: string,
  payload: UpdatePatientPayload,
) =>
  apiClient<ApiResponse<IPatient>>(`/patients/${patientId}`, {
    method: "PATCH",
    body: payload,
  });

// Delete Patient
export const deletePatient = (patientId: string) =>
  apiClient<ApiResponse<null>>(`/patients/${patientId}`, {
    method: "DELETE",
  });

// Get Patients By Doctor
export const getPatientsByDoctor = (
  doctorId: string,
  params?: Omit<PatientQueryParams, "doctorId" | "startDate" | "endDate">,
) =>
  apiClient<PatientListResponse>(`/patients/doctor/${doctorId}`, {
    method: "GET",
    query: params,
  });

// Remove Patient From Doctor
export const removePatientFromDoctor = (
  doctorId: string,
  patientId: string,
) =>
  apiClient<ApiResponse<null>>(
    `/patients/doctor/${doctorId}/patient/${patientId}`,
    {
      method: "DELETE",
    },
  );

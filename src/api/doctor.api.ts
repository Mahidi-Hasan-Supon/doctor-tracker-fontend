
import apiClient from "@/lib/apiClient";
import type {
  CreateDoctorPayload,
  DoctorQueryParams,
  IDoctor,
  UpdateDoctorPayload,
  DoctorPaginationMeta,
} from "@/types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface DoctorListResponse {
  success: boolean;
  message: string;
  meta: DoctorPaginationMeta;
  data: IDoctor[];
}

// Create Doctor
export const createDoctor = (payload: CreateDoctorPayload) => {
  return apiClient<ApiResponse<IDoctor>>("/doctors", {
    method: "POST",
    body: payload,
  });
};

// Get All Doctors
export const getAllDoctors = (params?: DoctorQueryParams) => {
  return apiClient<DoctorListResponse>("/doctors", {
    method: "GET",
    query: params,
  });
};

// Get Single Doctor
export const getSingleDoctor = (doctorId: string) => {
  return apiClient<ApiResponse<IDoctor>>(`/doctors/${doctorId}`, {
    method: "GET",
  });
};

// Update Doctor
export const updateDoctor = (
  doctorId: string,
  payload: UpdateDoctorPayload
) => {
  return apiClient<ApiResponse<IDoctor>>(`/doctors/${doctorId}`, {
    method: "PATCH",
    body: payload,
  });
};

// Delete Doctor
export const deleteDoctor = (doctorId: string) => {
  return apiClient<ApiResponse<null>>(`/doctors/${doctorId}`, {
    method: "DELETE",
  });
};

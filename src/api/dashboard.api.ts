
import apiClient from "@/lib/apiClient";
import { DashboardOverview, DoctorPatientDistribution, DoctorStatistics, PatientsPerDoctor, PatientStatistics, StatisticsQueryParams } from "@/types/dashboard.type";


interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Dashboard Overview
export const getDashboardOverview = () => {
  return apiClient<ApiResponse<DashboardOverview>>(
    "/dashboard/overview",
    { method: "GET" },
  );
};

// Patients Per Doctor
export const getPatientsPerDoctor = () => {
  return apiClient<ApiResponse<PatientsPerDoctor[]>>(
    "/dashboard/patients-per-doctor",
    { method: "GET" },
  );
};

// Doctor Patient Distribution
export const getDoctorPatientDistribution = () => {
  return apiClient<ApiResponse<DoctorPatientDistribution[]>>(
    "/dashboard/doctor-patient-distribution",
    { method: "GET" },
  );
};

// Patient Statistics
export const getPatientStatistics = (
  params?: StatisticsQueryParams,
) => {
  return apiClient<ApiResponse<PatientStatistics[]>>(
    "/dashboard/patient-statistics",
    { method: "GET", query: params },
  );
};

// Doctor Statistics
export const getDoctorStatistics = (
  params?: StatisticsQueryParams,
) => {
  return apiClient<ApiResponse<DoctorStatistics[]>>(
    "/dashboard/doctor-statistics",
    { method: "GET", query: params },
  );
};

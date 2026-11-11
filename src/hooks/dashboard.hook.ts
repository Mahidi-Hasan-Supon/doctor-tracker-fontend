
import { useQuery } from "@tanstack/react-query";

import {
  getDashboardOverview,
  getPatientsPerDoctor,
  getDoctorPatientDistribution,
  getPatientStatistics,
  getDoctorStatistics,
} from "@/api/dashboard.api";
import { StatisticsQueryParams } from "@/types/dashboard.type";


// Dashboard Overview
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard", "overview"],
    queryFn: getDashboardOverview,
  });
};

// Patients Per Doctor
export const usePatientsPerDoctor = () => {
  return useQuery({
    queryKey: ["dashboard", "patients-per-doctor"],
    queryFn: getPatientsPerDoctor,
  });
};

// Doctor Patient Distribution
export const useDoctorPatientDistribution = () => {
  return useQuery({
    queryKey: ["dashboard", "doctor-patient-distribution"],
    queryFn: getDoctorPatientDistribution,
  });
};

// Patient Statistics
export const usePatientStatistics = (
  params?: StatisticsQueryParams,
) => {
  return useQuery({
    queryKey: ["dashboard", "patient-statistics", params],
    queryFn: () => getPatientStatistics(params),
  });
};

// Doctor Statistics
export const useDoctorStatistics = (
  params?: StatisticsQueryParams,
) => {
  return useQuery({
    queryKey: ["dashboard", "doctor-statistics", params],
    queryFn: () => getDoctorStatistics(params),
  });
};

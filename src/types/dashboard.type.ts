
export interface DashboardOverview {
  totalDoctors: number;
  totalPatients: number;
}

export interface PatientsPerDoctor {
  doctorId: string;
  doctorName: string;
  specialization: string;
  totalPatients: number;
}

export interface DoctorPatientDistribution {
  name: string;
  value: number;
}

export interface PatientStatistics {
  date: string;
  totalPatients: number;
}

export interface DoctorStatistics {
  date: string;
  totalDoctors: number;
}

export interface StatisticsQueryParams {
  startDate?: string;
  endDate?: string;
  period?: "daily" | "monthly" | "yearly";
}

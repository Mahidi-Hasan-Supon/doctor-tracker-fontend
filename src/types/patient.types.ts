
export interface IPatient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "MALE" | "FEMALE";
  address: string;
  condition: string;
  medicalHistory?: string;
  doctorId: {
    _id: string;
    name: string;
    specialization: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientPayload {
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "MALE" | "FEMALE";
  address: string;
  condition: string;
  medicalHistory?: string;
  doctorId: string;
}

export type UpdatePatientPayload = Partial<CreatePatientPayload>;

export interface PatientQueryParams {
  search?: string;
  condition?: string;
  gender?: "MALE" | "FEMALE";
  doctorId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface PatientPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

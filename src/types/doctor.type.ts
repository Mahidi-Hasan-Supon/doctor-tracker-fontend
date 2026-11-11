
export interface IDoctor {
  _id: string;
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorPayload {
  name: string;
  specialization: string;
  hospital: string;
  phone: string;
  email: string;
}

export type UpdateDoctorPayload = Partial<CreateDoctorPayload>;

export interface DoctorQueryParams {
  search?: string;
  specialization?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface DoctorPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

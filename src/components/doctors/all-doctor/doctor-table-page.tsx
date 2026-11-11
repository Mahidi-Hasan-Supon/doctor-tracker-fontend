
"use client";

import type { IDoctor } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DoctorTableProps {
  doctors: IDoctor[];
}

const DoctorTable = ({ doctors }: DoctorTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor._id}>
              <TableCell className="font-medium">
                {doctor.name}
              </TableCell>

              <TableCell>{doctor.specialization}</TableCell>

              <TableCell>{doctor.hospital}</TableCell>

              <TableCell>{doctor.phone}</TableCell>

              <TableCell>{doctor.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorTable;

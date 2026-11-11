'use client'
import CreateDoctorForm from "@/components/doctors/create-doctor-form";


const CreateDoctorPage = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Create Doctor
        </h1>
        <p className="text-sm text-muted-foreground">
          Add a new doctor to the Doctor Tracker system.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <CreateDoctorForm />
      </div>
    </div>
  );
};

export default CreateDoctorPage;

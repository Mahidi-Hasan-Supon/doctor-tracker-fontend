import CreatePatientForm from "@/components/form/createPatientForm";


const CreatePatientPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Patient
        </h1>
        <p className="text-muted-foreground">
          Register a new patient and assign them to a doctor.
        </p>
      </div>

      <CreatePatientForm />
    </div>
  );
};

export default CreatePatientPage;

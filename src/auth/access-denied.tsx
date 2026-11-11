
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-red-100 p-4">
          <ShieldAlert className="size-8 text-red-500" />
        </div>

        <div>
          <h1 className="text-lg font-semibold">
            You do not have access to this page
          </h1>

          <p className="text-sm text-muted-foreground">
            Go back to{" "}
            <Link href="/" className="font-medium text-green-600 underline">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;

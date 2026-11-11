
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  lebel?: string;
}

const AuthLoading = ({ lebel = "Verifying Account..." }: IProps) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center gap-4">
        <Skeleton className="size-12 rounded-full" />

        <Skeleton className="h-4 w-40" />

        <p className="text-sm text-muted-foreground">{lebel}</p>
      </div>
    </div>
  );
};

export default AuthLoading;

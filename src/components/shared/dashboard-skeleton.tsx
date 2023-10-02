import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const DashboardCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 max-w-xs" />
        <Skeleton className="h-4 max-w-lg" />
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 max-w-sm" />
          <Skeleton className="h-9" />
          <Skeleton className="h-4 max-w-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 max-w-sm" />
          <Skeleton className="h-9" />
          <Skeleton className="h-4 max-w-md" />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-6">
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
};

export default DashboardCardSkeleton;

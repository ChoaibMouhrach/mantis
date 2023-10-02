import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

interface DashboardCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
};

interface DashboardCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardCardContent: React.FC<DashboardCardContentProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <Separator />
      <CardContent className={`p-6 ${className}`}>{children}</CardContent>
    </>
  );
};

interface DashboardCardFooterProps {
  children: React.ReactNode;
}

export const DashboardCardFooter: React.FC<DashboardCardFooterProps> = ({
  children,
}) => {
  return (
    <>
      <Separator />
      <CardFooter className="p-6">{children}</CardFooter>
    </>
  );
};

export default DashboardCard;

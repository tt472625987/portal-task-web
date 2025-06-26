import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  className?: string;
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

function CardCompact({
  className,
  title,
  description,
  footer,
  content,
}: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export { CardCompact };

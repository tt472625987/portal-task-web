import { LucideTriangleAlert } from "lucide-react";
import { cloneElement } from "react";

type Props = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

const Placeholder = ({
  label,
  icon = <LucideTriangleAlert />,
  button = <div />,
}: Props) => {
  return (
    <div className="flex flex-col self-center items-center justify-center flex-1 gap-y-3">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-lg font-semibold">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
};

export { Placeholder };

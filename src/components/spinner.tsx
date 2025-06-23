import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center self-center">
      <LucideLoaderCircle className="w-12 h-12 animate-spin" />
    </div>
  );
};

export { Spinner };

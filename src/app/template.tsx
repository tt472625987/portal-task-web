import { RedirectToast } from "@/components/redirect-toast";

type Props = {
  children: React.ReactNode;
};

export default function Template({ children }: Props) {
  return (
    <>
      {children}
      <RedirectToast />
    </>
  );
}

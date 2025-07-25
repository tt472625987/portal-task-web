export type NavItem = {
  title: string;
  href: string;
  icon: React.ReactElement<{ className?: string }>;
  separator?: boolean;
};

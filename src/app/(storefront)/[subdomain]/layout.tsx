import { Header } from "../_components/header-catalog";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 bg-accent-foreground/5">
      <Header />
      {children}
    </div>
  );
}

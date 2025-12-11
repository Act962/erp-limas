import { Header } from "../_components/header-catalog";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-accent-foreground/5">
      <Header />
      <div className="mt-20">{children}</div>
    </div>
  );
}

import { Header } from "../_components/header-catalog";

export default function SubdomainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-accent-foreground/5">
      <Header />
      <main className="mt-15 sm:mt-19">{children}</main>
    </div>
  );
}

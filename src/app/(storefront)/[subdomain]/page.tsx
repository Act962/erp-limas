import { Catalog } from "../_components/catalog";
import { Header } from "../_components/header-catalog";

export default function Page() {
  return (
    <div className="bg-accent-foreground/5">
      <Header />
      <Catalog />
    </div>
  );
}

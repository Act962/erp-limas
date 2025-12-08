import { Catalogo } from "../_components/catalogo";
import { Header } from "../_components/header";

export default function Page() {
  return (
    <div className="bg-accent-foreground/5">
      <Header />
      <Catalogo />
    </div>
  );
}

import { Heading } from "./_components/heading";
import { ProductsContainer } from "./_components/products-container";

export default function Page() {
  return (
    <div className="h-full bg-emerald-50">
      <Heading />

      <ProductsContainer />
    </div>
  );
}

import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { ProductsContainer } from "@/features/products/components/products-container";
import { orpc } from "@/lib/orpc";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.categories.listAll.queryOptions());

  return (
    <div className="h-full">
      <HydrateClient client={queryClient}>
        <ProductsContainer />
      </HydrateClient>
    </div>
  );
}

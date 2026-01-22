import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { CatalogSettings } from "@/features/catalogo/components/catalog";
import { orpc } from "@/lib/orpc";
export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.catalogSettings.list.queryOptions());
  return (
    <>
      <HydrateClient client={queryClient}>
        <CatalogSettings />
      </HydrateClient>
    </>
  );
}

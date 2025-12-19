import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { CatalogSettings } from "./_components/catalog";
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

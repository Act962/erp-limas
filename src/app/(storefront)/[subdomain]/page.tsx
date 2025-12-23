import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Catalog } from "../_components/catalog";
import { orpc } from "@/lib/orpc";

interface StoreFrontLayoutProps {
  params: Promise<{ subdomain: string }>;
}

export default async function Page({ params }: StoreFrontLayoutProps) {
  const { subdomain } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain: subdomain,
      },
    })
  );

  await queryClient.prefetchQuery(
    orpc.catalogSettings.listProducts.queryOptions({
      input: {
        subdomain: subdomain,
      },
    })
  );

  return (
    <>
      <HydrateClient client={queryClient}>
        <Catalog subdomain={subdomain} />
      </HydrateClient>
    </>
  );
}

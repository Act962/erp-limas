import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { DetailsPoduct } from "../../_components/details-product";
import { orpc } from "@/lib/orpc";

interface ProductProps {
  params: Promise<{
    subdomain: string;
    productSlug: string;
  }>;
}

export default async function Page({ params }: ProductProps) {
  const { subdomain, productSlug } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    orpc.catalogSettings.relatedProducts.queryOptions({
      input: {
        subdomain: subdomain,
        productSlug: productSlug,
      },
    })
  );

  return (
    <HydrateClient client={queryClient}>
      <DetailsPoduct subdomain={subdomain} slug={productSlug} />
    </HydrateClient>
  );
}

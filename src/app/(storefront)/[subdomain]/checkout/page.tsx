import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Checkout } from "../../_components/checkout";
import { orpc } from "@/lib/orpc";

interface CheckoutProps {
  params: Promise<{ subdomain: string }>;
}
export default async function Page({ params }: CheckoutProps) {
  const queryClient = getQueryClient();

  const { subdomain } = await params;

  await queryClient.prefetchQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain: subdomain,
      },
    })
  );

  return (
    <HydrateClient client={queryClient}>
      <Checkout subdomain={subdomain} />
    </HydrateClient>
  );
}

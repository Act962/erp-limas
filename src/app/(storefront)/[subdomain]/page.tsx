import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Catalog } from "../../../features/storefront/components/catalog";

interface StoreFrontLayoutProps {
  params: Promise<{ subdomain: string }>;
}

export default async function Page({ params }: StoreFrontLayoutProps) {
  const { subdomain } = await params;

  const queryClient = getQueryClient();

  return (
    <HydrateClient client={queryClient}>
      <Catalog subdomain={subdomain} />
    </HydrateClient>
  );
}

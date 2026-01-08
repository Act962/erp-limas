import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { Catalog } from "../_components/catalog";
import { orpc } from "@/lib/orpc";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";

interface StoreFrontLayoutProps {
  params: Promise<{ subdomain: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const searchParamsCache = createSearchParamsCache({
  category: parseAsArrayOf(parseAsString, ",").withDefault([]),
});

export default async function Page({
  params,
  searchParams,
}: StoreFrontLayoutProps) {
  const { subdomain } = await params;
  const search = await searchParams;

  const { category: categorySlug } = searchParamsCache.parse(search);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    orpc.catalogSettings.listProducts.queryOptions({
      input: {
        subdomain: subdomain,
        categorySlug: categorySlug.length > 0 ? categorySlug : undefined,
      },
    })
  );

  return (
    <HydrateClient client={queryClient}>
      <Catalog subdomain={subdomain} />
    </HydrateClient>
  );
}

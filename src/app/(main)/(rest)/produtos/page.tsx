import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { ProductsContainer } from "./_components/products-container";
import { orpc } from "@/lib/orpc";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import z from "zod";

interface ProductParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const searchParamsCache = createSearchParamsCache({
  category: parseAsArrayOf(parseAsString, ",").withDefault([]),
  sku: parseAsString,
  min_value: parseAsString,
  max_value: parseAsString,
});

const filterSchema = z.object({
  category: z.string().optional(),
  sku: z.string().optional(),
  min_value: z.string().optional(),
  max_value: z.string().optional(),
});

export default async function Page({ searchParams }: ProductParams) {
  const queryClient = getQueryClient();
  const search = await searchParams;

  const {
    category,
    sku,
    min_value: minValue,
    max_value: maxValue,
  } = filterSchema.parse(search);

  await queryClient.prefetchQuery(
    orpc.products.list.queryOptions({
      input: {
        category: category?.split(",").map((c) => c.trim()),
        sku: sku ?? undefined,
        minValue: minValue ?? undefined,
        maxValue: maxValue ?? undefined,
      },
    })
  );
  await queryClient.prefetchQuery(orpc.categories.listAll.queryOptions());

  return (
    <div className="h-full">
      <HydrateClient client={queryClient}>
        <ProductsContainer />
      </HydrateClient>
    </div>
  );
}

import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { ProductsContainer } from "./_components/products-container";
import { orpc } from "@/lib/orpc";
import z from "zod";
import dayjs from "dayjs";

interface ProductParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const filterSchema = z.object({
  category: z.string().optional(),
  sku: z.string().optional(),
  min_value: z.string().optional(),
  max_value: z.string().optional(),
  date_init: z.string().optional(),
  date_end: z.string().optional(),
});

export default async function Page({ searchParams }: ProductParams) {
  const queryClient = getQueryClient();
  const search = await searchParams;

  const {
    category,
    sku,
    min_value: minValue,
    max_value: maxValue,
    date_init: dateInit,
    date_end: dateEnd,
  } = filterSchema.parse(search);

  await queryClient.prefetchQuery(
    orpc.products.list.queryOptions({
      input: {
        category: category?.split(",").map((c) => c.trim()),
        sku: sku ?? undefined,
        minValue: minValue ?? undefined,
        maxValue: maxValue ?? undefined,
        date_init: dateInit
          ? dayjs(dateInit).startOf("day").toDate()
          : undefined,
        date_end: dateEnd ? dayjs(dateEnd).endOf("day").toDate() : undefined,
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

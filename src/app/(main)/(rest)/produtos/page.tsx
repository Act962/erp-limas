import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { ProductsContainer } from "./_components/products-container";
import { orpc } from "@/lib/orpc";
import dayjs from "dayjs";
import { SearchParams } from "nuqs";
import { productParamsLoader } from "@/fealtures/products/server/params-loader";

interface ProductParams {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: ProductParams) {
  const queryClient = getQueryClient();

  const queryParams = await productParamsLoader(searchParams);

  const {
    category,
    sku,
    min_value: minValue,
    max_value: maxValue,
    date_init: dateInit,
    date_end: dateEnd,
  } = queryParams;

  await queryClient.prefetchQuery(
    orpc.products.list.queryOptions({
      input: {
        category: category,
        sku: sku,
        minValue: minValue,
        maxValue: maxValue,
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

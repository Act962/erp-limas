import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface UseProductsProps {
  category: string[] | undefined;
  sku: string | undefined;
  minValue: string | undefined;
  maxValue: string | undefined;
  date_init: Date | undefined;
  date_end: Date | undefined;
}

export function useProducts({
  category,
  sku,
  minValue,
  maxValue,
  date_init,
  date_end,
}: UseProductsProps) {
  const { data } = useQuery(
    orpc.products.list.queryOptions({
      input: {
        category,
        sku,
        minValue,
        maxValue,
        date_init,
        date_end,
      },
    })
  );
  return {
    data: data?.products || [],
  };
}

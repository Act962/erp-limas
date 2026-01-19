import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface UseProductsProps {
  category?: string[];
  sku?: string;
  minValue?: string;
  maxValue?: string;
  dateInit?: Date;
  dateEnd?: Date;
}

export function useProducts({
  category,
  sku,
  minValue,
  maxValue,
  dateInit,
  dateEnd,
}: UseProductsProps) {
  const { data, isLoading } = useQuery(
    orpc.products.list.queryOptions({
      input: {
        category,
        sku,
        minValue,
        maxValue,
        dateInit,
        dateEnd,
      },
    })
  );
  return {
    data: data?.products || [],
    isLoading,
  };
}

interface useQueryProductsOfCartProps {
  subdomain: string;
  productIds: string[];
}

export function useQueryProductsOfCart({
  subdomain,
  productIds,
}: useQueryProductsOfCartProps) {
  const { data, isLoading } = useQuery(
    orpc.catalogSettings.listProductsOfCart.queryOptions({
      input: {
        subdomain,
        productIds,
      },
    })
  );
  return {
    data: data?.products || [],
    isLoading,
  };
}

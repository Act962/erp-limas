import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface UseCatalogProductsProps {
  subdomain: string;
  categorySlugs?: string[];
}

export function useCatalogProducts({
  subdomain,
  categorySlugs,
}: UseCatalogProductsProps) {
  const { data, isLoading } = useQuery(
    orpc.catalogSettings.listProducts.queryOptions({
      input: {
        subdomain,
        categorySlugs,
      },
      enabled: !!subdomain,
    })
  );

  return {
    data: data,
    isLoadingProducts: isLoading,
  };
}

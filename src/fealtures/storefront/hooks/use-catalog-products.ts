import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface UseCatalogProductsProps {
  subdomain: string;
  categoriesSlugs?: string[];
}

export function useCatalogProducts({
  subdomain,
  categoriesSlugs,
}: UseCatalogProductsProps) {
  const { data, isLoading } = useQuery(
    orpc.catalogSettings.listProducts.queryOptions({
      input: {
        subdomain,
        categoriesSlugs,
      },
      enabled: !!subdomain,
    })
  );

  return {
    data: data,
    isLoadingProducts: isLoading,
  };
}

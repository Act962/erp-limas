import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface UseCatalogSettingsProps {
  subdomain: string;
}

export function useCatalogSettings({ subdomain }: UseCatalogSettingsProps) {
  const { data, isLoading } = useQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain,
      },
      enabled: !!subdomain,
    })
  );

  return {
    data: data?.catalogSettings,
    isLoading,
  };
}

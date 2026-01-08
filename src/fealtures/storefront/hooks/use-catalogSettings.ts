import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface UseCatalogSettingsProps {
  subdomain: string;
}

export function useCatalogSettings({ subdomain }: UseCatalogSettingsProps) {
  const { data } = useQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain,
      },
    })
  );

  return {
    data: data?.catalogSettings || undefined,
  };
}

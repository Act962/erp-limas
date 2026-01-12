import { orpc } from "@/lib/orpc";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const updateFieldCatalog = () => {
  return useMutation(
    orpc.catalogSettings.update.mutationOptions({
      onSuccess: () => {
        toast("Catálogo atualizado!");
      },
      onError: () => {
        toast("Erro ao atualizar catálogo!");
      },
    })
  );
};

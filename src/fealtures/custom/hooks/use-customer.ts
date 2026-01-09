import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

export function useCustomer() {
  const { data, isPending } = useQuery(orpc.customer.list.queryOptions({}));

  return {
    customers: data?.customers || [],
    isLoading: isPending,
  };
}

import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";
import { PersonType } from "@/generated/prisma/enums";

interface UseCustomerProps {
  personType?: PersonType;
  minPurchase?: number;
  maxPurchase?: number;
  dateIni?: Date;
  dateEnd?: Date;
}

export function useCustomer({
  personType,
  minPurchase,
  maxPurchase,
  dateIni,
  dateEnd,
}: UseCustomerProps) {
  const { data, isPending } = useQuery(
    orpc.customer.list.queryOptions({
      input: {
        personType,
        minPurchase,
        maxPurchase,
        dateIni,
        dateEnd,
      },
    })
  );

  return {
    customers: data?.customers || [],
    isLoading: isPending,
  };
}

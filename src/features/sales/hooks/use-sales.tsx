import { orpc } from "@/lib/orpc";
import { useQuery } from "@tanstack/react-query";

interface useQuerySalesProps {
  dateInit?: Date;
  dateEnd?: Date;
  methodPayment?: string;
  status?: string;
  minValue?: number;
  maxValue?: number;
}

export function useQuerySales({
  dateInit,
  dateEnd,
  methodPayment,
  status,
  minValue,
  maxValue,
}: useQuerySalesProps) {
  const { data, isLoading } = useQuery(
    orpc.sales.list.queryOptions({
      input: {
        dateInit,
        dateEnd,
        methodPayment,
        status,
        minValue,
        maxValue,
      },
    })
  );

  return {
    data: data?.sales || [],
    isLoadingSales: isLoading,
  };
}

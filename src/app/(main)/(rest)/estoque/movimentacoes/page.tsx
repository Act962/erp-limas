import { PageHeader } from "@/components/page-header";
import { ListMovements } from "./_components/list-movements";
import { CreateStockMovimentModal } from "@/components/modals/stock/create-stock-moviment-modal";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { orpc } from "@/lib/orpc";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.products.list.queryOptions());

  await queryClient.prefetchQuery(
    orpc.stocks.list.queryOptions({
      input: {
        offset: 1,
        limit: 100,
      },
    })
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Movimentações de Estoque"
        description="Visualize e gerencie as movimentações de estoque"
      >
        <HydrateClient client={queryClient}>
          <CreateStockMovimentModal />
        </HydrateClient>
      </PageHeader>
      <HydrateClient client={queryClient}>
        <ListMovements />
      </HydrateClient>
    </div>
  );
}

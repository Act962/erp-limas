import { PageHeader } from "@/components/page-header";
import { ListMovements } from "./_components/list-movements";
import { CreateStockMovimentModal } from "@/components/modals/stock/create-stock-moviment-modal";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { orpc } from "@/lib/orpc";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SearchParams } from "nuqs";
import { stockParamsLoader } from "@/fealtures/stock/server/params-loader";

type TrackingPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: TrackingPageProps) {
  const queryClient = getQueryClient();

  const organization = await auth.api.listMembers({
    headers: await headers(),
  });

  await queryClient.prefetchQuery(
    orpc.products.list.queryOptions({
      input: {},
    })
  );

  const queryParams = await stockParamsLoader(searchParams);

  await queryClient.prefetchQuery(
    orpc.stocks.list.queryOptions({
      input: {
        offset: 1,
        limit: 100,
        userIds: queryParams.participant,
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
        <ListMovements
          members={organization.members.map((member) => member.user)}
        />
      </HydrateClient>
    </div>
  );
}

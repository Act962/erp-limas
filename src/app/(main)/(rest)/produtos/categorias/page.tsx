import { PageHeader } from "@/components/page-header";
import { ListCategories } from "@/features/products/components/list-categories";
import { CreateCategoryButton } from "./create-category-button";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";
import { orpc } from "@/lib/orpc";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.categories.list.queryOptions());

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorias"
        description="Organize seus produtos em categorias"
      >
        <CreateCategoryButton />
      </PageHeader>
      <HydrateClient client={queryClient}>
        <ListCategories />
      </HydrateClient>
    </div>
  );
}

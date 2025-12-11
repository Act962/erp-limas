import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListCategories } from "../_components/list-categories";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Categorias"
        description="Organize seus produtos em categorias"
      >
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Nova Categoria
        </Button>
      </PageHeader>

      <ListCategories />
    </div>
  );
}

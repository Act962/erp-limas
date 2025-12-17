import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ListMovements } from "./_components/list-movements";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Movimentações de Estoque"
        description="Visualize e gerencie as movimentações de estoque"
      >
        <Button size="sm">
          {" "}
          <Plus className="size-4" /> Nova Movimentação
        </Button>
      </PageHeader>

      <ListMovements />
    </div>
  );
}

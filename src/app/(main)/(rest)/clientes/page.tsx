import { CreateStockMovimentModal } from "@/components/modals/stock/create-stock-moviment-modal";
import { PageHeader } from "@/components/page-header";
import { ListCustomers } from "@/fealtures/custom/components/list-customers";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Gerencie seus clientes e acompanhe o histórico de compras"
      >
        <CreateStockMovimentModal />
      </PageHeader>

      <ListCustomers />
    </div>
  );
}

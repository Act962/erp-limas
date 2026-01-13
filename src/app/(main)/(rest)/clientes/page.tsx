import { PageHeader } from "@/components/page-header";
import { CreateCustomerModal } from "@/fealtures/custom/components/create-customer";
import { ListCustomers } from "@/fealtures/custom/components/list-customers";

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Gerencie seus clientes e acompanhe o histórico de compras"
      >
        <CreateCustomerModal />
      </PageHeader>
      <ListCustomers />
    </div>
  );
}

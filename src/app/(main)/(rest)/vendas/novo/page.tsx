import { CreateSalePage } from "@/fealtures/sales/components/novo/create-sale";
import { PageHeader } from "@/components/page-header";

export default function Page() {
  return (
    <>
      <PageHeader title="Nova Venda" description="Crie uma nova venda" />
      <CreateSalePage />
    </>
  );
}

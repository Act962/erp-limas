import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProductView } from "../_components/product-view";

// Mock data - in real app would come from API based on params.id
const product = {
  id: 1,
  name: "Notebook Dell Inspiron 15",
  sku: "NB-001",
  barcode: "7891234567890",
  category: "Eletrônicos",
  description:
    "Notebook Dell Inspiron 15 com processador Intel Core i5, 8GB RAM, 256GB SSD, tela Full HD de 15.6 polegadas. Ideal para trabalho e entretenimento.",
  salePrice: 3499.9,
  costPrice: 2800.0,
  currentStock: 15,
  minStock: 5,
  unit: "Unidade",
  location: "Prateleira A-12",
  image: "/modern-laptop-workspace.png",
  isActive: true,
  trackStock: true,
  allowNegative: false,
  showOnCatalog: true,
  createdAt: "2024-01-15T10:30:00",
  updatedAt: "2024-12-08T14:22:00",
};

const stockHistory = [
  {
    id: 1,
    type: "ENTRADA",
    quantity: 50,
    date: "2024-12-10T14:30:00",
    user: "Admin User",
    note: "Compra fornecedor",
  },
  {
    id: 2,
    type: "VENDA",
    quantity: -2,
    date: "2024-12-10T12:15:00",
    user: "Sistema PDV",
    note: "Venda #1234",
  },
  {
    id: 3,
    type: "AJUSTE",
    quantity: -3,
    date: "2024-12-09T10:45:00",
    user: "João Silva",
    note: "Ajuste de inventário",
  },
  {
    id: 4,
    type: "VENDA",
    quantity: -1,
    date: "2024-12-09T09:20:00",
    user: "Sistema PDV",
    note: "Venda #1232",
  },
  {
    id: 5,
    type: "ENTRADA",
    quantity: 30,
    date: "2024-12-08T16:00:00",
    user: "Admin User",
    note: "Compra fornecedor",
  },
];

export default function Page() {
  return (
    <div>
      <PageHeader title={product.name} description={product.sku}>
        <Button variant="outline" size="sm" asChild>
          <Link href="/produtos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <Button size="sm" asChild>
          <Link href={`/produtos/${product.id}/editar`}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Link>
        </Button>

        <Button size="sm" variant="destructive" asChild>
          <Link href={`/produtos/${product.id}/editar`}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Link>
        </Button>
      </PageHeader>

      <ProductView product={product} history={stockHistory} />
    </div>
  );
}

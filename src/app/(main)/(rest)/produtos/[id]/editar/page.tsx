import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { EditProductForm } from "./edit-product-form";

// Mock data - in real app would come from API
const product = {
  id: 1,
  name: "Notebook Dell Inspiron 15",
  sku: "NB-001",
  barcode: "7891234567890",
  category: "eletronicos",
  description:
    "Notebook Dell Inspiron 15 com processador Intel Core i5, 8GB RAM, 256GB SSD, tela Full HD de 15.6 polegadas.",
  salePrice: 3499.9,
  costPrice: 2800.0,
  currentStock: 15,
  minStock: 5,
  unit: "un",
  location: "Prateleira A-12",
  image: "/modern-laptop-workspace.png",
  isActive: true,
  trackStock: true,
  allowNegative: false,
  showOnCatalog: true,
};

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Editar Produto"
        description={`Editando: ${product.name}`}
      >
        <Button size={"sm"} variant="outline" asChild>
          <Link href={`/produtos/${product.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </PageHeader>

      <EditProductForm product={product} />
    </div>
  );
}

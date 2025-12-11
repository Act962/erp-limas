"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateProductsModal } from "@/hooks/modals/use-create-products";
import Link from "next/link";
import { ProductsTable } from "./products-table";

const products = [
  {
    id: 1,
    name: "Notebook Dell Inspiron 15",
    sku: "NB-001",
    barcode: "7891234567890",
    category: "Eletrônicos",
    salePrice: 3499.9,
    costPrice: 2800.0,
    currentStock: 15,
    minStock: 5,
    image: "/modern-laptop-workspace.png",
    isActive: true,
  },
  {
    id: 2,
    name: "Mouse Logitech MX Master 3",
    sku: "MO-045",
    barcode: "7891234567891",
    category: "Periféricos",
    salePrice: 459.9,
    costPrice: 320.0,
    currentStock: 3,
    minStock: 10,
    image: "/field-mouse.png",
    isActive: true,
  },
  {
    id: 3,
    name: "Teclado Mecânico RGB Redragon",
    sku: "TC-023",
    barcode: "7891234567892",
    category: "Periféricos",
    salePrice: 349.9,
    costPrice: 220.0,
    currentStock: 8,
    minStock: 8,
    image: "/mechanical-keyboard.png",
    isActive: true,
  },
  {
    id: 4,
    name: "Monitor LG 24 Polegadas Full HD",
    sku: "MN-012",
    barcode: "7891234567893",
    category: "Monitores",
    salePrice: 899.9,
    costPrice: 650.0,
    currentStock: 0,
    minStock: 5,
    image: "/computer-monitor.png",
    isActive: true,
  },
  {
    id: 5,
    name: "Webcam Full HD Logitech C920",
    sku: "WC-008",
    barcode: "7891234567894",
    category: "Webcams",
    salePrice: 589.9,
    costPrice: 410.0,
    currentStock: 25,
    minStock: 12,
    image: "/classic-webcam.png",
    isActive: true,
  },
  {
    id: 6,
    name: "Headset Gamer HyperX Cloud II",
    sku: "HD-017",
    barcode: "7891234567895",
    category: "Audio",
    salePrice: 549.9,
    costPrice: 380.0,
    currentStock: 12,
    minStock: 8,
    image: "/gaming-headset.png",
    isActive: false,
  },
];

export function ProductsContainer() {
  const { onOpen } = useCreateProductsModal();

  return (
    <div className="px-4 mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Lista de Produtos</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie seu catálogo de produtos
          </p>
        </div>

        <div>
          <Button size={"sm"} onClick={onOpen} asChild>
            <Link href={"/produtos"}>
              <Plus className="size-4" />
              Adicionar Produto
            </Link>
          </Button>
        </div>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}

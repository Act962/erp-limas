"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateProductsModal } from "@/hooks/modals/use-create-products";

export function ProductsContainer() {
  const { onOpen } = useCreateProductsModal();

  return (
    <div className="px-4 mt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Lista de Produtos</h3>

        <div>
          <Button size={"sm"} onClick={onOpen}>
            <Plus className="size-4" />
            Adicionar Produto
          </Button>
        </div>
      </div>
    </div>
  );
}

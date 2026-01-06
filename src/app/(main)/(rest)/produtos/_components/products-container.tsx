"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProductsTable } from "./products-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useQueryState } from "nuqs";

export function ProductsContainer() {
  const [category] = useQueryState("category");
  const [sku] = useQueryState("sku");
  const [minValue] = useQueryState("min_value");
  const [maxValue] = useQueryState("max_value");
  const { data: Products } = useSuspenseQuery(
    orpc.products.list.queryOptions({
      input: {
        category: category?.split(",").map((c) => c.trim()),
        sku: sku ?? undefined,
        minValue: minValue ?? undefined,
        maxValue: maxValue ?? undefined,
      },
    })
  );
  const { products } = Products;
  const { data } = useSuspenseQuery(orpc.categories.listAll.queryOptions());
  const { categories } = data;

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
          <Button size={"sm"} asChild>
            <Link href={"/produtos/novo"}>
              <Plus className="size-4" />
              Adicionar Produto
            </Link>
          </Button>
        </div>
      </div>

      <ProductsTable
        products={products.map((product) => ({
          ...product,
          image: product.image ? useConstructUrl(product.image) : "",
        }))}
        categories={categories}
      />
    </div>
  );
}

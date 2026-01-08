"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProductsTable } from "./products-table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useQueryState } from "nuqs";
import dayjs from "dayjs";
import { useMemo, useEffect } from "react";

export function ProductsContainer() {
  const [category] = useQueryState("category");
  const [sku] = useQueryState("sku");
  const [minValue] = useQueryState("min_value");
  const [maxValue] = useQueryState("max_value");
  const [date_init] = useQueryState("date_init");
  const [date_end] = useQueryState("date_end");

  const queryInput = useMemo(
    () => ({
      category: category?.split(",").map((c) => c.trim()),
      sku: sku ?? undefined,
      minValue: minValue ?? undefined,
      maxValue: maxValue ?? undefined,
      date_init: date_init
        ? dayjs(date_init).startOf("day").toDate()
        : undefined,
      date_end: date_end ? dayjs(date_end).endOf("day").toDate() : undefined,
    }),
    [category, sku, minValue, maxValue, date_init, date_end]
  );

  const { data: Products } = useSuspenseQuery(
    orpc.products.list.queryOptions({
      input: queryInput,
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

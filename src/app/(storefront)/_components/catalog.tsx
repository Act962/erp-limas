"use client";

import { FiltersCatalog } from "./filters";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryState } from "nuqs";
import { ProductCard } from "./product-card";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { notFound } from "next/navigation";
import { sortProducts } from "@/utils/sorteble-products";
interface CatalogProps {
  subdomain: string;
}
export function Catalog({ subdomain }: CatalogProps) {
  const options: EmblaOptionsType = { loop: true };
  const [categoryParam] = useQueryState("category");

  const { data } = useSuspenseQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain: subdomain,
      },
    })
  );
  const { data: listProducts } = useSuspenseQuery(
    orpc.catalogSettings.listProducts.queryOptions({
      input: {
        subdomain: subdomain,
        categorySlug: categoryParam?.split(",").map((s) => s.trim()),
      },
    })
  );

  const { products, categories } = listProducts;
  const { catalogSettings } = data;

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 4000 }),
  ]);

  const sortedProducts = sortProducts(products, catalogSettings.sortOrder);

  const mockedImagesCatalog = [
    "https://picsum.photos/800/200?random=1",
    "https://picsum.photos/800/200?random=2",
    "https://picsum.photos/800/200?random=3",
    "https://picsum.photos/800/200?random=4",
    "https://picsum.photos/800/200?random=5",
    "https://picsum.photos/800/200?random=6",
    "https://picsum.photos/800/200?random=7",
    "https://picsum.photos/800/200?random=8",
    "https://picsum.photos/800/200?random=9",
    "https://picsum.photos/800/200?random=10",
  ];

  const filteredProducts = useMemo(() => {
    if (!categoryParam) {
      return sortedProducts;
    }

    const selectedSlugs = categoryParam.split(",").map((s) => s.trim());

    return sortedProducts.filter((product) =>
      selectedSlugs.includes(product.categorySlug)
    );
  }, [categoryParam]);

  if (catalogSettings.isActive === false) {
    return notFound();
  }

  return (
    <div className="w-full max-w-6xl mx-auto justify-center">
      <div className="flex flex-col w-full justify-between px-3">
        {/*Carousel */}
        <div className="overflow-hidden size-full mt-7" ref={emblaRef}>
          <div className="flex gap-2 size-full">
            {mockedImagesCatalog &&
              mockedImagesCatalog.map((image, index) => (
                <div
                  className="flex w-full justify-center translate-0 shrink-0 grow-0 min-w-full size-full"
                  key={`image-carousel-${index}`}
                >
                  <img
                    src={image}
                    alt="Imagem do catalogo"
                    className="object-cover w-full"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-x-3 py-6 ">
          <span className="hidden sm:block text-sm text-muted-foreground">
            {filteredProducts.length} produto(s) encontrado(s)
          </span>
          <FiltersCatalog categories={categories} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              organizationId={product.organizationId}
              name={product.name}
              slug={product.slug}
              salePrice={product.salePrice}
              thumbnail={product.thumbnail}
              allowsOrders={catalogSettings.allowOrders}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// use DotButton
type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

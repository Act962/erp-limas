"use client";

import { FiltersCatalog } from "./filters";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryState } from "nuqs";
import { ProductCatalog } from "../types/product";
import { CategoryCatalog } from "../types/category";
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

  console.log(subdomain);

  const { data } = useSuspenseQuery(
    orpc.catalogSettings.public.queryOptions({
      input: {
        subdomain: subdomain,
      },
    })
  );
  const { catalogSettings } = data;

  const [categoryParam] = useQueryState("category");
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 4000 }),
  ]);

  const mockedProducts: ProductCatalog[] = [
    {
      id: "1",
      name: "Notebook Gamer RTX 4050",
      salePrice: 5899.9,
      thumbnail: "https://picsum.photos/400/400?random=1",
      images: [
        "https://picsum.photos/800/800?random=1",
        "https://picsum.photos/800/800?random=11",
        "https://picsum.photos/800/800?random=111",
      ],
      categorySlug: "notebooks",
      createdAt: new Date("2024-03-12T10:22:14-03:00"),
    },
    {
      id: "2",
      name: "Mouse Sem Fio Logitech MX",
      salePrice: 249.9,
      thumbnail: "https://picsum.photos/400/400?random=2",
      images: [
        "https://picsum.photos/800/800?random=2",
        "https://picsum.photos/800/800?random=22",
      ],
      categorySlug: "perifericos",
      createdAt: new Date("2024-07-28T15:41:03-03:00"),
    },
    {
      id: "3",
      name: "Teclado Mecânico RGB",
      salePrice: 399.99,
      thumbnail: "https://picsum.photos/400/400?random=3",
      images: [
        "https://picsum.photos/800/800?random=3",
        "https://picsum.photos/800/800?random=33",
      ],
      categorySlug: "perifericos",
      createdAt: new Date("2024-11-09T09:12:57-03:00"),
    },
    {
      id: "4",
      name: 'Monitor 27" Full HD',
      salePrice: 1299.0,
      thumbnail: "https://picsum.photos/400/400?random=4",
      images: [
        "https://picsum.photos/800/800?random=4",
        "https://picsum.photos/800/800?random=44",
      ],
      categorySlug: "monitores",
      createdAt: new Date("2025-01-18T18:25:44-03:00"),
    },
    {
      id: "5",
      name: "Headset Gamer 7.1",
      salePrice: 799.9,
      thumbnail: "https://picsum.photos/400/400?random=5",
      images: [
        "https://picsum.photos/800/800?random=5",
        "https://picsum.photos/800/800?random=55",
      ],
      categorySlug: "audio",
      createdAt: new Date("2025-03-04T14:08:30-03:00"),
    },
    {
      id: "6",
      name: "SSD NVMe 1TB",
      salePrice: 699.9,
      thumbnail: "https://picsum.photos/400/400?random=6",
      images: [
        "https://picsum.photos/800/800?random=6",
        "https://picsum.photos/800/800?random=66",
      ],
      categorySlug: "armazenamento",
      createdAt: new Date("2025-06-22T20:55:10-03:00"),
    },
    {
      id: "7",
      name: "Cadeira Gamer Ergonômica",
      salePrice: 1599.0,
      thumbnail: "https://picsum.photos/400/400?random=7",
      images: [
        "https://picsum.photos/800/800?random=7",
        "https://picsum.photos/800/800?random=77",
        "https://picsum.photos/800/800?random=777",
      ],
      categorySlug: "moveis-gamer",
      createdAt: new Date("2025-08-09T12:37:55-03:00"),
    },
    {
      id: "8",
      name: "Webcam Full HD",
      salePrice: 299.9,
      thumbnail: "https://picsum.photos/400/400?random=8",
      images: ["https://picsum.photos/800/800?random=8"],
      categorySlug: "acessorios",
      createdAt: new Date("2025-10-01T08:19:22-03:00"),
    },
    {
      id: "9",
      name: "Caixa de Som Bluetooth",
      salePrice: 349.9,
      thumbnail: "https://picsum.photos/400/400?random=9",
      images: [
        "https://picsum.photos/800/800?random=9",
        "https://picsum.photos/800/800?random=99",
      ],
      categorySlug: "audio",
      createdAt: new Date("2025-11-29T21:44:11-03:00"),
    },
    {
      id: "10",
      name: "Smartphone Android 128GB",
      salePrice: 2499.0,
      thumbnail: "https://picsum.photos/400/400?random=10",
      images: [
        "https://picsum.photos/800/800?random=10",
        "https://picsum.photos/800/800?random=100",
        "https://picsum.photos/800/800?random=1000",
      ],
      categorySlug: "smartphones",
      createdAt: new Date("2025-12-19T17:14:48-03:00"),
    },
  ];
  const sortedProducts = sortProducts(
    mockedProducts,
    catalogSettings.sortOrder
  );

  const mockedCategories: CategoryCatalog[] = [
    {
      id: "cat_01",
      name: "Informática",
      categorySlug: "informatica",
      description: "Produtos de informática e acessórios",
    },
    {
      id: "cat_02",
      name: "Periféricos",
      categorySlug: "perifericos",
      description: "Teclados, mouses e acessórios",
    },
    {
      id: "cat_03",
      name: "Monitores",
      categorySlug: "monitores",
      description: "Monitores e telas profissionais",
    },
    {
      id: "cat_04",
      name: "Notebooks",
      categorySlug: "notebooks",
      description: "Notebooks e laptops",
    },
    {
      id: "cat_05",
      name: "Gamers",
      categorySlug: "gamers",
      description: "Produtos para setup gamer",
    },
    {
      id: "cat_06",
      name: "Smartphones",
      categorySlug: "smartphones",
      description: "Celulares e acessórios",
    },
    {
      id: "cat_07",
      name: "Áudio",
      categorySlug: "audio",
      description: "Fones, caixas de som e headsets",
    },
    {
      id: "cat_08",
      name: "Armazenamento",
      categorySlug: "armazenamento",
      description: "HDs, SSDs e cartões de memória",
    },
    {
      id: "cat_09",
      name: "Móveis Gamer",
      categorySlug: "moveis-gamer",
      description: "Cadeiras e mesas gamer",
    },
    {
      id: "cat_10",
      name: "Acessórios",
      categorySlug: "acessorios",
      description: "Cabos, suportes e adaptadores",
    },
  ];
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
      return mockedProducts;
    }

    const selectedSlugs = categoryParam.split(",").map((s) => s.trim());

    return mockedProducts.filter((product) =>
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
                  className="flex w-full justify-center translate-0 shrink-0 grow-0 size-full"
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
          <FiltersCatalog categories={mockedCategories} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              salePrice={product.salePrice}
              thumbnail={product.thumbnail}
              categorySlug={product.categorySlug}
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

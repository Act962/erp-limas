"use client";

import { useCallback, useEffect, useState } from "react";
import { ProductCatalog } from "../types/product";
import { currencyFormatter } from "../utils/currencyFormatter";
import { Header } from "./header-catalog";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Minus,
  Plus,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";
import { useShoppingCart } from "../hooks/use-product";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

interface DetailsPoductProps extends ProductCatalog {
  quantityInit: number;
}

export function DetailsPoduct({
  id,
  name,
  salePrice,
  categorySlug,
  images,
  description,
  thumbnail,
  quantityInit,
}: DetailsPoductProps) {
  const [imageSelected, setImageSelected] = useState(thumbnail);
  const [quantity, setQuantity] = useState(quantityInit || 0);

  const { cartItems, updateQuantity } = useShoppingCart();

  const [emblaRef, emblaApi] = useEmblaCarousel({});
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  function onSubmit(quantity: number) {
    setQuantity(quantity);
    updateQuantity(id, quantity);
  }

  const categoryProducts = [
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
    },
  ];

  return (
    <div className="h-screen space-y-5">
      <Header />
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="bg-accent-foreground/10 rounded-sm py-5 px-4  
          sm:px-10"
        >
          <div className="flex items-center text-sm font-semibold mb-3 gap-1">
            <span className="hover:underline cursor-pointer">
              {categorySlug}
            </span>
            <ChevronRight className="size-3" />
            <span>{name}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
            <div className="flex justify-center items-center flex-col gap-y-5 sm:justify-start sm:hidden">
              <div className="overflow-hidden size-full" ref={emblaRef}>
                <div className="flex gap-2 size-full">
                  {images &&
                    images.map((image, index) => (
                      <div
                        className="flex justify-center translate-0 shrink-0 grow-0 size-full"
                        key={`image-carousel-${index}`}
                      >
                        <img
                          src={image}
                          alt={name}
                          className="object-cover rounded-2xl"
                        />
                      </div>
                    ))}
                </div>
              </div>
              {/* DotsButton */}
              {images && images.length > 0 && (
                <div className="flex flex-row gap-1">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      onClick={() => onDotButtonClick(index)}
                      className="flex items-center justify-center cursor-pointer size-4 rounded-full border-2 border-gray-400"
                    >
                      {index === selectedIndex ? (
                        <div className="size-2 rounded-full bg-gray-800" />
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden flex-1 flex-row gap-x-5 sm:justify-start sm:flex justify-center">
              <div className="flex flex-col gap-4 min-w-13">
                {images &&
                  images.map((image) => (
                    <img
                      data-selected={imageSelected === image}
                      key={image}
                      src={image}
                      alt={name}
                      className="w-15 h-15 rounded-sm cursor-pointer
                  data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40"
                      onClick={() => setImageSelected(image)}
                    />
                  ))}
              </div>
              <div className="items-center sm:block">
                <img
                  src={imageSelected}
                  alt={name}
                  className="w-full rounded-2xl
               object-cover"
                />
              </div>
            </div>
            <div className="h-full px-4">
              <h1 className="font-bold text-3xl">{name}</h1>
              <h3 className="text-2xl font-semibold opacity-80 mt-2">
                R${currencyFormatter(salePrice)}
              </h3>
              <div className="flex flex-col mt-2">
                <span className="text-md font-medium">Categoria</span>
                <span className="text-md font-medium text-muted-foreground">
                  {categorySlug}
                </span>
              </div>
              <div className="flex flex-wrap items-center mt-4 gap-4">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-9 w-9 rounded-none"
                  >
                    <Minus className="size-4" />
                  </Button>
                  <span className="px-4 font-medium min-w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-9 w-9 rounded-none"
                    onClick={() => onSubmit(quantity + 1)}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
                <Button>
                  <ShoppingBag /> Adicionar ao Carrinho
                </Button>
              </div>
              <span className="mt-5 block">{description}</span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col bg-accent-foreground/10 rounded-sm px-4 sm:px-10 py-5 mt-7 space-y-5
          "
        >
          <h2 className="text-2xl font-bold">
            Outros produtos desta categoria
          </h2>
          <div className="flex items-center justify-center md:justify-between gap-x-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center gap-5 bg-foreground/5 rounded-2xl pb-5 shadow-md cursor-pointer 
                hover:shadow-lg hover:shadow-elegant"
                >
                  <div className="w-full h-35 rounded-t-2xl overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col px-5 ">
                    <h3 className="font-medium line-clamp-2 min-h-[50px]">
                      {product.name}
                    </h3>
                    <span className="text-xl font-semibold ">
                      R${currencyFormatter(product.salePrice)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="hidden md:flex">
              <PlusCircle className="size-4" /> Ver mais
            </Button>
          </div>
        </div>
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

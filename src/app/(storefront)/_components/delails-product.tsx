"use client";

import { useCallback, useEffect, useState } from "react";
import { currencyFormatter } from "../../../utils/currency-formatter";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronRight,
  Minus,
  Plus,
  PlusCircle,
  ShoppingBag,
} from "lucide-react";
import { useShoppingCart } from "../../../hooks/use-product";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";

interface DetailsPoductProps {
  subdomain: string;
  slug: string;
}

export function DetailsPoduct({ subdomain, slug }: DetailsPoductProps) {
  const { data } = useSuspenseQuery(
    orpc.catalogSettings.relatedProducts.queryOptions({
      input: {
        subdomain: subdomain,
        productSlug: slug,
      },
    })
  );

  const { product, productsWithThisCategory } = data;

  const [imageSelected, setImageSelected] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, updateQuantity, addToCart, removeFromCart } =
    useShoppingCart();
  const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({});
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const [isMounted, setIsMounted] = useState(false);

  const productInCart = !!cartItems.find((item) => item.id === product.id);

  function handleQuantity(quantity: number) {
    setQuantity(quantity);
    updateQuantity(product.id, quantity);
  }

  const showAsInCart = productInCart && isMounted;

  const handleAddAndRemoveToCart = () => {
    if (productInCart) {
      removeFromCart(product.id);
      return;
    }
    addToCart({ ...product, quantity });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log(product.images);

  return (
    <div className="mx-auto w-full max-w-5xl py-8 ">
      <div
        className="bg-accent-foreground/10 rounded-sm py-5 px-4  
          sm:px-10"
      >
        <div className="flex items-center text-sm font-semibold mb-3 gap-1">
          <span className="hover:underline cursor-pointer">
            {product.category.name}
          </span>
          <ChevronRight className="size-3" />
          <span>{product.name}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
          <div className="flex justify-center items-center flex-col gap-y-5 sm:justify-start sm:hidden">
            <div className="overflow-hidden size-full" ref={emblaRef}>
              <div className="flex gap-2">
                {product.images &&
                  product.images.map((image, index) => (
                    <div
                      className="flex justify-center translate-0 shrink-0 grow-0 w-full"
                      key={`image-carousel-${index}`}
                    >
                      <img
                        src={image}
                        alt={`imagem do ${product.name}`}
                        className="object-cover rounded-2xl size-full"
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/* DotsButton */}
            {product.images && product.images.length > 0 && (
              <div className="flex flex-row gap-1">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    onClick={() => onDotButtonClick(index)}
                    className="flex items-center justify-center cursor-pointer size-4 rounded-full "
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
            <div className="flex flex-col gap-4 max-w-10 h-10">
              {product.images &&
                product.images.map((image) => (
                  <img
                    data-selected={imageSelected === image}
                    key={image}
                    src={image}
                    alt={product.name}
                    className="size-full rounded-sm cursor-pointer
                  data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40 object-cover"
                    onClick={() => setImageSelected(image)}
                  />
                ))}
            </div>
            <div className="items-center sm:block">
              <img
                src={imageSelected}
                alt={product.name}
                className="rounded-2xl
               object-cover size-full"
              />
            </div>
          </div>
          <div className="h-full px-4">
            <h3 className="font-bold text-xl">{product.name}</h3>
            <h1 className="text-3xl font-semibold opacity-80">
              R${currencyFormatter(product.salePrice)}
            </h1>
            <div className="flex flex-col mt-2">
              <span className="text-md font-medium">Categoria</span>
              <span className="text-md font-medium text-muted-foreground">
                {product.category.name}
              </span>
            </div>
            <div className="flex flex-wrap items-center mt-4 gap-4">
              <div className="flex items-center">
                <Button
                  disabled={quantity <= 1}
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 rounded-none"
                  onClick={() => handleQuantity(quantity - 1)}
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
                  onClick={() => handleQuantity(quantity + 1)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button onClick={() => handleAddAndRemoveToCart()}>
                {showAsInCart ? "Adicionado" : "Adicionar"}
                {showAsInCart ? (
                  <Check className="size-4" />
                ) : (
                  <ShoppingBag className="size-4" />
                )}
              </Button>
            </div>
            <span className="mt-5 block text-sm">{product.description}</span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col bg-accent-foreground/10 rounded-sm px-4 sm:px-10 py-5 mt-7 space-y-5
          "
      >
        <h2 className="text-2xl font-bold">Outros produtos desta categoria</h2>
        <div className="flex items-center justify-center md:justify-between gap-x-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {productsWithThisCategory.map((product) => (
              <div
                onClick={() => router.push(`/${product.slug}`)}
                key={product.id}
                className="flex flex-col items-center gap-5 bg-foreground/5 rounded-2xl pb-5 shadow-md cursor-pointer 
                hover:shadow-lg"
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
          <Button
            className="hidden md:flex"
            onClick={() => router.push(`/?category=${product.category.slug}`)}
          >
            <PlusCircle className="size-4" /> Ver mais
          </Button>
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

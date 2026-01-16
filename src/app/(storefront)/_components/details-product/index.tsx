"use client";

import { useEffect, useState } from "react";
import { currencyFormatter } from "@/utils/currency-formatter";
import { Button } from "@/components/ui/button";
import {
  BoxIcon,
  ChevronRight,
  MessageCircleIcon,
  Minus,
  Plus,
  PlusCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Image from "next/image";
import placeholder from "@/assets/background-default-image.svg";
import { useCart } from "@/hooks/use-cart";
import { ButtonSale } from "../button-sale";
import { Separator } from "@/components/ui/separator";
import { PriceSaleDetails } from "./price-sale-details";
import { Label } from "@/components/ui/label";
import { useCatalogSettings } from "@/fealtures/storefront/hooks/use-catalog-settings";
import { SafeContent } from "@/components/rich-text/safe-content";
import { Skeleton } from "@/components/ui/skeleton";

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

  const { data: catalogSettings, isLoading: isCatalogSettingsLoading } =
    useCatalogSettings({
      subdomain,
    });

  const { products, updateQuantity, isProductInCart, toggleProduct } =
    useCart(subdomain);

  const { product, productsWithThisCategory } = data;

  const currentProductInCart = products.find(
    (thisProduct) => thisProduct.productId === product.id
  );

  const [imageSelected, setImageSelected] = useState(product.thumbnail);
  const [quantity, setQuantity] = useState<number>(
    Number(currentProductInCart?.quantity) || 1
  );

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const showAsInCart = isProductInCart(product.id) && isMounted;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const imageSrc =
    product.thumbnail && product.thumbnail.trim() !== ""
      ? useConstructUrl(product.thumbnail)
      : placeholder;

  function descriptionParse() {
    if (!product.description) return null;
    try {
      return JSON.parse(product.description);
    } catch (error) {
      return product.description;
    }
  }

  function openWhatsapp() {
    window.open(
      `https://wa.me/${catalogSettings?.whatsappNumber}?text=Olá, gostaria de comprar o produto ${product.name}`,
      "_blank"
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl py-8 ">
      <div
        className="bg-accent-foreground/10 rounded-sm py-5 px-4  
          sm:px-10 flex flex-col justify-center"
      >
        <div className="flex items-center text-sm font-semibold mb-3 gap-2 ">
          <span className="hover:underline cursor-pointer">
            {product.category.name}
          </span>
          <ChevronRight className="size-3" />
          <span>{product.name}</span>
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 w-full gap-10 items-center">
          <div className="flex flex-col gap-y-5 w-full justify-center ">
            <div className="items-center w-full">
              <div className="items-center sm:block w-full h-120 bg-accent/30 rounded-sm py-1 relative">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="rounded-xl object-contain size-full"
                />
              </div>
            </div>
            <div className="flex gap-4 max-w-full overflow-x-auto w-full">
              {product.images &&
                product.images.map((image, index) => (
                  <div
                    key={`image-thumbnail-${index}-${image}`}
                    className="flex justify-center items-center w-10 h-10 relative"
                  >
                    <Image
                      data-selected={imageSelected === image}
                      src={useConstructUrl(image)}
                      alt={product.name}
                      fill
                      className="size-full rounded-sm cursor-pointer
                    data-[selected=true]:ring-2 data-[selected=true]:ring-primary/40 object-cover"
                      onClick={() => setImageSelected(image)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="h-full px-4 flex flex-col justify-center ">
            <h3 className="font-medium text-3xl mb-2">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-md font-medium">Categoria:</span>
              <span className="text-md font-medium text-muted-foreground">
                {product.category.name}
              </span>
            </div>
            <span className="text-sm font-medium text-muted-foreground mb-4">
              {product.sku && "SKU: " + product.sku}
            </span>
            <PriceSaleDetails
              salePrice={product.salePrice}
              promotionalPrice={product.promotionalPrice}
            />
            <div className="flex flex-col mt-2">
              {catalogSettings?.showStock && (
                <div className="flex items-center gap-2 mt-2">
                  <BoxIcon className="size-4 text-green-700" />
                  <span className="text-md font-medium text-green-700">
                    {product.currentStock} unidades em estoque
                  </span>
                </div>
              )}
            </div>
            <Separator className="w-full my-2 bg-gray-300" />
            <div className="flex flex-col mt-2 mb-4 gap-2">
              <Label className="text-sm text-gray-500">Quantidade</Label>
              <div className="flex items-center gap-2">
                <Button
                  disabled={quantity <= 1}
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 "
                  onClick={() => {
                    updateQuantity(
                      product.id,
                      subdomain,
                      (quantity - 1).toString()
                    );
                    setQuantity(quantity - 1);
                  }}
                >
                  <Minus className="size-4" />
                </Button>
                <div className="flex justify-center items-center px-4 font-medium text-center border border-gray-300 rounded-sm h-10 ">
                  <span>{quantity + 0}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-9 w-9 "
                  onClick={() => {
                    updateQuantity(
                      product.id,
                      subdomain,
                      (quantity + 1).toString()
                    );
                    setQuantity(quantity + 1);
                  }}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-2 overflow-auto">
              {isCatalogSettingsLoading ? (
                <div className="flex flex-1 gap-2">
                  <Skeleton className="w-full h-14" />
                  <Skeleton className="w-full h-14" />
                </div>
              ) : (
                <div className="flex flex-wrap w-full items-center gap-2">
                  {catalogSettings?.allowOrders && (
                    <div className="flex-1">
                      <ButtonSale
                        className="w-full h-14 text-lg"
                        data={{
                          productIsDisponile: data.productIsDisponile,
                          showAsInCart: showAsInCart,
                        }}
                        onClick={() =>
                          toggleProduct(product.id, quantity.toString())
                        }
                      />
                    </div>
                  )}
                  {catalogSettings?.whatsappNumber &&
                    catalogSettings?.whatsappNumber !== "" && (
                      <div className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full h-14 text-lg"
                          onClick={openWhatsapp}
                        >
                          <MessageCircleIcon className="size-4" />
                          {catalogSettings?.allowOrders
                            ? "Comprar pelo whatsapp"
                            : "Conversar pelo whatsapp"}
                        </Button>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Separator className="w-full my-2" />

        {product.description && (
          <div>
            <SafeContent
              content={descriptionParse()}
              className="mt-5 block text-sm max-w-none min-h-[125px] focus:outline-none p-4 prose dark:prose-invert marker:text-gray-500 prose-p:my-0 prose-hr:border-gray-400/20"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col bg-accent-foreground/10 rounded-sm px-4 sm:px-10 py-5 mt-7 space-y-5">
        <h2 className="text-2xl font-bold">Outros produtos desta categoria</h2>
        <div className="flex items-center justify-center md:justify-between gap-x-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 items-center">
            {productsWithThisCategory.map((product) => (
              <div
                onClick={() => router.push(`/${product.slug}`)}
                key={product.id}
                className="flex flex-col items-center gap-5 bg-foreground/5 rounded-2xl pb-5 shadow-md cursor-pointer 
                hover:shadow-lg"
              >
                <div className="w-full h-35 rounded-t-2xl overflow-hidden items-center relative">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    className="object-cover"
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

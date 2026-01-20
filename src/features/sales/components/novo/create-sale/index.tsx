"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectCustomerDialog } from "../select-customer-dialog";
import { PaymentDialog } from "../payment-dialog";
import { SaleCompletedDialog } from "../sale-completed-dialog";
import Link from "next/link";
import { useProducts } from "@/features/products/hooks/use-products";
import { PersonType } from "@/schemas/customer";
import { ProductSection } from "./product-section";
import { CartSale } from "./cart-sale";
import { useQueryState } from "nuqs";

export interface CustomerSales {
  id: string;
  name: string;
  document: string | null;
  email: string | null;
  phone: string | null;
  personType: PersonType;
}

export type CartItem = {
  id: string;
  name: string;
  currentStock: number;
  sku: string | null;
  price: number;
  quantity: number;
};

export interface ProductSale {
  id: string;
  name: string;
  image: string | null;
  sku: string | null;
  barcode: string | null;
  salePrice: number;
  costPrice: number;
  currentStock: number;
  minStock: number;
  isActive: boolean;
  maxStock?: number;
}

type ViewMode = "grid" | "list";

export default function CreateSalePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"percent" | "value">(
    "percent",
  );
  const [customer, setCustomer] = useState<CustomerSales | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isCashRegisterOpen, setIsCashRegisterOpen] = useState(true);

  // Dialogs
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [completedDialogOpen, setCompletedDialogOpen] = useState(false);
  const [completedSale, setCompletedSale] = useState<{
    saleNumber: string;
    total: number;
    paymentMethod: string;
    change: number;
    customerName: string | null;
    invoiceGenerated: boolean;
  } | null>(null);

  // Barcode scanner
  const [barcodeBuffer, setBarcodeBuffer] = useState("");
  const barcodeTimeout = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useQueryState("page");

  const {
    hasNextPage,
    hasPreviousPage,
    data: products,
    isLoading,
  } = useProducts({
    page: Number(page) || 1,
    pageSize: 12,
  });

  // Barcode scanner listener
  const handleBarcodeInput = useCallback(
    (e: KeyboardEvent) => {
      // Ignore if focus is on search input (manual typing)
      if (document.activeElement === searchInputRef.current) return;

      // Only process alphanumeric characters
      if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        setBarcodeBuffer((prev) => prev + e.key);

        // Clear previous timeout
        if (barcodeTimeout.current) {
          clearTimeout(barcodeTimeout.current);
        }

        // Set new timeout - barcode scanners typically send characters very fast
        barcodeTimeout.current = setTimeout(() => {
          // Process barcode if we have enough characters
          if (barcodeBuffer.length >= 8) {
            const product = products?.find(
              (p) => p.barcode === barcodeBuffer || p.sku === barcodeBuffer,
            );
            if (product && product.currentStock > 0) {
              addToCart(product);
            }
          }
          setBarcodeBuffer("");
        }, 100);
      }

      // Enter key finalizes barcode input
      if (e.key === "Enter" && barcodeBuffer) {
        if (barcodeTimeout.current) {
          clearTimeout(barcodeTimeout.current);
        }
        const product = products?.find(
          (p) => p.barcode === barcodeBuffer || p.sku === barcodeBuffer,
        );
        if (product && product.currentStock > 0) {
          addToCart(product);
        }
        setBarcodeBuffer("");
      }
    },
    [barcodeBuffer],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleBarcodeInput);
    return () => {
      window.removeEventListener("keydown", handleBarcodeInput);
      if (barcodeTimeout.current) {
        clearTimeout(barcodeTimeout.current);
      }
    };
  }, [handleBarcodeInput]);

  //filtros para adicionar no back futuramente

  const filteredProducts = products?.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode.includes(searchTerm),
  );

  const addToCart = (product: ProductSale) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      if (cartItem.quantity < Number(product.currentStock)) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: Number(product.salePrice),
          quantity: 1,
          currentStock: Number(product.currentStock),
        },
      ]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === id) {
            const cartItem = cartItems.find((item) => item.id === id);
            if (cartItem) {
              return { ...item, quantity: item.quantity + delta };
            }
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const setItemQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems
        .map((item) => {
          if (item.id === id) {
            if (quantity > item.currentStock) {
              return { ...item, quantity: item.currentStock };
            }
            return { ...item, quantity: quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setCustomer(null);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discountAmount =
    discountType === "percent" ? (subtotal * discount) / 100 : discount;
  const total = Math.max(0, subtotal - discountAmount);

  const handlePaymentConfirm = (data: {
    paymentMethod: string;
    amountPaid: number;
    change: number;
    generateInvoice: boolean;
    printReceipt: boolean;
  }) => {
    // Generate sale number
    const saleNumber = `VND-${String(Date.now()).slice(-6)}`;

    setCompletedSale({
      saleNumber,
      total,
      paymentMethod: data.paymentMethod,
      change: data.change,
      customerName: customer?.name || null,
      invoiceGenerated: data.generateInvoice,
    });
    setPaymentDialogOpen(false);
    setCompletedDialogOpen(true);
  };

  const handleNewSale = () => {
    clearCart();
    setCompletedSale(null);
  };

  if (!isCashRegisterOpen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
          <LockIcon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Caixa Fechado</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Para realizar vendas, é necessário abrir o caixa primeiro.
        </p>
        <Link href="/vendas/caixa">
          <Button size="lg">Ir para Controle de Caixa</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barcode indicator */}
      {/* {barcodeBuffer && (
        <Alert>
          <Barcode className="h-4 w-4" />
          <AlertDescription>
            Lendo código de barras: <span className="font-mono font-semibold">{barcodeBuffer}</span>
          </AlertDescription>
        </Alert>
      )} */}

      <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
        {/* Left Side - Product Selection */}
        <ProductSection
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          searchInputRef={searchInputRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          addToCart={addToCart}
          products={filteredProducts}
          isLoading={isLoading}
        />

        {/* Right Side - Cart */}
        <CartSale
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          clearCart={clearCart}
          discount={discount}
          setDiscount={setDiscount}
          customer={customer}
          total={total}
          setCustomerDialogOpen={setCustomerDialogOpen}
          setPaymentDialogOpen={setPaymentDialogOpen}
          setItemQuantity={setItemQuantity}
          subtotal={subtotal}
        />
      </div>

      {/* Dialogs */}
      <SelectCustomerDialog
        open={customerDialogOpen}
        onOpenChange={setCustomerDialogOpen}
        selectedCustomer={customer}
        onSelect={setCustomer}
      />
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        total={total}
        customerName={customer?.name || null}
        onConfirm={handlePaymentConfirm}
      />
      <SaleCompletedDialog
        open={completedDialogOpen}
        onOpenChange={setCompletedDialogOpen}
        sale={completedSale}
        onNewSale={handleNewSale}
        onPrintReceipt={() => {}}
        onPrintInvoice={() => {}}
      />
    </div>
  );
}

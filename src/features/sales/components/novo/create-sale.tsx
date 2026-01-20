"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  User,
  DollarSign,
  X,
  Grid3X3Icon,
  List,
  LockIcon,
  ShoppingCartIcon,
  PercentIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { SelectCustomerDialog } from "./select-customer-dialog";
import { PaymentDialog } from "./payment-dialog";
import { SaleCompletedDialog } from "./sale-completed-dialog";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/features/products/hooks/use-products";
import { PersonType } from "@/schemas/customer";

export interface CustomerSales {
  id: string;
  name: string;
  document: string | null;
  email: string | null;
  phone: string | null;
  personType: PersonType;
}

type CartItem = {
  id: string;
  name: string;
  currentStock: number;
  sku: string | null;
  price: number;
  quantity: number;
};

interface Product {
  id: string;
  name: string;
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

  const { data: products } = useProducts({});

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

  const filteredProducts = products?.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.barcode.includes(searchTerm),
  );

  const addToCart = (product: Product) => {
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

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Buscar por nome, SKU ou código de barras..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs
                  value={viewMode}
                  onValueChange={(v) => setViewMode(v as ViewMode)}
                >
                  <TabsList className="h-9">
                    <TabsTrigger value="grid" className="px-2">
                      <Grid3X3Icon className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list" className="px-2">
                      <List className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() =>
                        Number(product.currentStock) > 0 && addToCart(product)
                      }
                      disabled={Number(product.currentStock) === 0}
                      className="group relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-secondary hover:bg-accent/30  disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Avatar className="h-14 w-14 rounded-md">
                        <AvatarImage
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                        />
                        <AvatarFallback>
                          {product.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <div className="text-xs font-medium line-clamp-2">
                          {product.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {product.sku}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-green-600">
                          {formatCurrency(product.salePrice)}
                        </div>
                        <Badge
                          variant={
                            product.currentStock > 0 ? "default" : "destructive"
                          }
                          className="mt-1 text-xs"
                        >
                          {product.currentStock > 0
                            ? `${product.currentStock} un`
                            : "Sem estoque"}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() =>
                        product.currentStock > 0 && addToCart(product)
                      }
                      disabled={product.currentStock === 0}
                      className="w-full flex items-center gap-3 rounded-lg border p-3 transition-all hover:border-primary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                        />
                        <AvatarFallback>
                          {product.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.sku} | {product.barcode}
                        </div>
                      </div>
                      <Badge
                        variant={
                          product.currentStock > 0 ? "secondary" : "destructive"
                        }
                      >
                        {product.currentStock > 0
                          ? `${product.currentStock} un`
                          : "Sem estoque"}
                      </Badge>
                      <div className="font-semibold text-primary">
                        {formatCurrency(product.salePrice)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Cart */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Carrinho</span>
                  {cartItems.length > 0 && (
                    <Badge variant="secondary">
                      {cartItems.reduce((sum, i) => sum + i.quantity, 0)} itens
                    </Badge>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <ShoppingCartIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium">Carrinho vazio</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Busque produtos ou use o leitor de código de barras
                  </p>
                </div>
              ) : (
                <>
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 rounded-lg border p-3"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.sku}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {formatCurrency(item.price)} x {item.quantity}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 bg-transparent"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                max={Number(item.currentStock)}
                                value={item.quantity}
                                onChange={(e) => {
                                  setItemQuantity(
                                    item.id,
                                    Number(e.target.value),
                                  );
                                }}
                                className="h-7 w-12 text-center p-0"
                              />
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7 bg-transparent"
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={
                                  item.quantity >= Number(item.currentStock)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="font-semibold text-sm">
                              {formatCurrency(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator />

                  {/* Customer */}
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => setCustomerDialogOpen(true)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {customer ? (
                      <span className="truncate">{customer.name}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        Adicionar cliente
                      </span>
                    )}
                  </Button>

                  {/* Discount */}
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs">Desconto</Label>
                      <div className="flex mt-1">
                        <Input
                          type="number"
                          min="0"
                          max={discountType === "percent" ? 100 : subtotal}
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="rounded-r-none"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-l-none border-l-0 bg-transparent"
                          onClick={() =>
                            setDiscountType(
                              discountType === "percent" ? "value" : "percent",
                            )
                          }
                        >
                          {discountType === "percent" ? (
                            <PercentIcon className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-medium">R$</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-success">
                        <span>
                          Desconto{" "}
                          {discountType === "percent" ? `(${discount}%)` : ""}
                        </span>
                        <span>- {formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-primary">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setPaymentDialogOpen(true)}
                    disabled={cartItems.length === 0}
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Finalizar Venda
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
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

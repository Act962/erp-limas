import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Link, Package } from "lucide-react";

function getStockStatus(current: number, min: number) {
  if (current === 0)
    return {
      label: "Sem estoque",
      className: "bg-red-500 text-red-50",
    };
  if (current < min)
    return {
      label: "Estoque baixo",
      className: "bg-yellow-500 text-yellow-50",
    };
  return {
    label: "Em estoque",
    className: "bg-green-500 text-green-50",
  };
}

interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  description: string;
  salePrice: number;
  costPrice: number;
  currentStock: number;
  minStock: number;
  unit: string;
  location: string;
  image: string;
  isActive: boolean;
  trackStock: boolean;
  allowNegative: boolean;
  showOnCatalog: boolean;
  createdAt: string;
  updatedAt: string;
}

interface StockHistory {
  id: number;
  type: string;
  quantity: number;
  date: string;
  user: string;
  note: string;
}

export function ProductView({
  product,
  history,
}: {
  product: Product;
  history: StockHistory[];
}) {
  const stockStatus = getStockStatus(product.currentStock, product.minStock);
  const margin =
    ((product.salePrice - product.costPrice) / product.costPrice) * 100;

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Produto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-6">
              <Avatar className="h-32 w-32 rounded-lg">
                <AvatarImage
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                />
                <AvatarFallback className="rounded-lg">
                  {product.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-2xl font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.isActive ? (
                    <Badge className="bg-success text-success-foreground">
                      Ativo
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inativo</Badge>
                  )}
                  <Badge className={stockStatus.className}>
                    {stockStatus.label}
                  </Badge>
                  {product.showOnCatalog && (
                    <Badge variant="outline">Visível no Catálogo</Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Descrição</h4>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">SKU</p>
                <p className="font-mono font-medium">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Código de Barras
                </p>
                <p className="font-mono font-medium">{product.barcode}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unidade</p>
                <p className="font-medium">{product.unit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="font-medium">{product.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Criado em</p>
                <p className="font-medium">{formatDate(product.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Atualizado em</p>
                <p className="font-medium">{formatDate(product.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Movimentações</CardTitle>
            <CardDescription>
              Últimas alterações no estoque deste produto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Observação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell className="text-sm">
                        {formatDate(movement.date)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{movement.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-semibold ${
                            movement.quantity > 0
                              ? "text-success"
                              : "text-destructive"
                          }`}
                        >
                          {movement.quantity > 0 ? "+" : ""}
                          {movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{movement.user}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {movement.note}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 bg-transparent"
            >
              <Link href="/estoque/movimentacoes">Ver Histórico Completo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Preços
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Preço de Custo</p>
              <p className="text-2xl font-semibold">
                R$ {product.costPrice.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Preço de Venda</p>
              <p className="text-2xl font-semibold text-blue-500">
                R$ {product.salePrice.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Margem de Lucro</p>
              <p className="text-xl font-semibold text-green-500">
                {margin.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Quantidade Atual</p>
              <p className="text-3xl font-semibold">{product.currentStock}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Estoque Mínimo</p>
              <p className="text-xl font-medium">{product.minStock}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className={stockStatus.className}>
                {stockStatus.label}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Controlar Estoque</span>
                <span className="font-medium">
                  {product.trackStock ? "Sim" : "Não"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Permitir Negativo</span>
                <span className="font-medium">
                  {product.allowNegative ? "Sim" : "Não"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

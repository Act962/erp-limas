import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Package,
  AlertTriangle,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Visão geral do seu negócio" />

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total em Vendas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">R$ 45.231,89</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span> desde o mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Produtos Ativos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1.234</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <Plus className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+5</span> novos hoje
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estoque Baixo
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">23</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowDownRight className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-3</span> desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vendas Hoje
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">45</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8</span> em relação a ontem
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas Vendas</CardTitle>
            <CardDescription>Você teve 45 vendas hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">João da Silva</div>
                        <div className="text-xs text-muted-foreground">
                          há 5 min
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">
                      Concluído
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ 234,50
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Maria Santos</div>
                        <div className="text-xs text-muted-foreground">
                          há 12 min
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary text-primary-foreground">
                      Confirmado
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ 156,00
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>PC</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Pedro Costa</div>
                        <div className="text-xs text-muted-foreground">
                          há 24 min
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success text-success-foreground">
                      Concluído
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ 89,90
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Ana Lima</div>
                        <div className="text-xs text-muted-foreground">
                          há 1h
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Rascunho</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ 450,00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Products */}
        <Card>
          <CardHeader>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>23 produtos precisam de atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Notebook Dell Inspiron",
                  sku: "NB-001",
                  stock: 2,
                  min: 5,
                },
                {
                  name: "Mouse Logitech MX Master",
                  sku: "MO-045",
                  stock: 3,
                  min: 10,
                },
                {
                  name: "Teclado Mecânico RGB",
                  sku: "TC-023",
                  stock: 1,
                  min: 8,
                },
                {
                  name: "Monitor LG 24 Polegadas",
                  sku: "MN-012",
                  stock: 0,
                  min: 5,
                },
                { name: "Webcam Full HD", sku: "WC-008", stock: 4, min: 12 },
              ].map((product) => (
                <div
                  key={product.sku}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      SKU: {product.sku}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {product.stock} un
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Min: {product.min}
                      </div>
                    </div>
                    <Badge
                      className={
                        product.stock === 0
                          ? "bg-destructive text-white"
                          : "bg-orange-500 text-white"
                      }
                    >
                      {product.stock === 0 ? "Sem estoque" : "Baixo"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver Todos os Alertas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

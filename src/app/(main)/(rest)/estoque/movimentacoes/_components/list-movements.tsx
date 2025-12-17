"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  Filter,
  PackageX,
  Pencil,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const movements = [
  {
    id: 1,
    type: "ENTRADA",
    product: "Notebook Dell Inspiron 15",
    sku: "NB-001",
    quantity: 50,
    previousStock: 15,
    newStock: 65,
    unitCost: 2800.0,
    date: "2024-12-10T14:30:00",
    user: "Admin User",
    notes: "Compra fornecedor ABC",
  },
  {
    id: 2,
    type: "VENDA",
    product: "Mouse Logitech MX Master 3",
    sku: "MO-045",
    quantity: -5,
    previousStock: 8,
    newStock: 3,
    unitCost: 320.0,
    date: "2024-12-10T12:15:00",
    user: "Sistema PDV",
    notes: "Venda VND-002",
  },
  {
    id: 3,
    type: "AJUSTE",
    product: "Teclado Mecânico RGB Redragon",
    sku: "TC-023",
    quantity: 2,
    previousStock: 6,
    newStock: 8,
    unitCost: 220.0,
    date: "2024-12-10T10:45:00",
    user: "João Silva",
    notes: "Ajuste de inventário",
  },
  {
    id: 4,
    type: "PERDA",
    product: "Webcam Full HD Logitech C920",
    sku: "WC-008",
    quantity: -3,
    previousStock: 28,
    newStock: 25,
    unitCost: 410.0,
    date: "2024-12-09T18:30:00",
    user: "Maria Santos",
    notes: "Produto com defeito",
  },
  {
    id: 5,
    type: "ENTRADA",
    product: "Headset Gamer HyperX Cloud II",
    sku: "HD-017",
    quantity: 30,
    previousStock: 12,
    newStock: 42,
    unitCost: 380.0,
    date: "2024-12-09T16:00:00",
    user: "Admin User",
    notes: "Reposição de estoque",
  },
  {
    id: 6,
    type: "SAIDA",
    product: "Monitor LG 24 Polegadas",
    sku: "MN-012",
    quantity: -5,
    previousStock: 5,
    newStock: 0,
    unitCost: 650.0,
    date: "2024-12-09T14:20:00",
    user: "Pedro Costa",
    notes: "Transferência para filial",
  },
];

const movementTypeConfig = {
  ENTRADA: {
    label: "Entrada",
    icon: ArrowDownRight,
    className: "bg-success text-success-foreground",
  },
  SAIDA: {
    label: "Saída",
    icon: ArrowUpRight,
    className: "bg-warning text-warning-foreground",
  },
  VENDA: {
    label: "Venda",
    icon: ArrowUpRight,
    className: "bg-primary text-primary-foreground",
  },
  COMPRA: {
    label: "Compra",
    icon: ArrowDownRight,
    className: "bg-success text-success-foreground",
  },
  AJUSTE: {
    label: "Ajuste",
    icon: TrendingUp,
    className: "bg-secondary text-secondary-foreground",
  },
  PERDA: {
    label: "Perda",
    icon: PackageX,
    className: "bg-destructive text-destructive-foreground",
  },
};

export function ListMovements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMovement, setViewMovement] = useState<
    (typeof movements)[0] | null
  >(null);
  const [editMovement, setEditMovement] = useState<
    (typeof movements)[0] | null
  >(null);
  const [isNewMovementOpen, setIsNewMovementOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredMovements = movements.filter((movement) => {
    const matchesSearch =
      movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movement.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || movement.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  return (
    <Tabs
      defaultValue="all"
      className="space-y-4"
      onValueChange={setTypeFilter}
    >
      <TabsList>
        <TabsTrigger value="all">Todas</TabsTrigger>
        <TabsTrigger value="ENTRADA">Entradas</TabsTrigger>
        <TabsTrigger value="SAIDA">Saídas</TabsTrigger>
        <TabsTrigger value="VENDA">Vendas</TabsTrigger>
        <TabsTrigger value="AJUSTE">Ajustes</TabsTrigger>
        <TabsTrigger value="PERDA">Perdas</TabsTrigger>
      </TabsList>

      <TabsContent value={typeFilter} className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por produto ou SKU..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mês</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-center">
                      Estoque Anterior
                    </TableHead>
                    <TableHead className="text-center">Novo Estoque</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Observações</TableHead>
                    <TableHead className="w-20">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovements.map((movement) => {
                    const config =
                      movementTypeConfig[
                        movement.type as keyof typeof movementTypeConfig
                      ];
                    const Icon = config.icon;
                    return (
                      <TableRow key={movement.id}>
                        <TableCell>
                          <Badge className={config.className}>
                            <Icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {movement.product}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {movement.sku}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`font-semibold ${
                              movement.quantity > 0
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          >
                            {movement.quantity > 0 ? "+" : ""}
                            {movement.quantity} un
                          </span>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {movement.previousStock} un
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {movement.newStock} un
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(movement.date)}
                        </TableCell>
                        <TableCell className="text-sm">
                          {movement.user}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {movement.notes}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setViewMovement(movement)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditMovement(movement)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredMovements.length} de {movements.length}{" "}
                movimentações
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

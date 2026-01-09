"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EyeIcon,
  FilterIcon,
  MoreVerticalIcon,
  SearchIcon,
  ShoppingBagIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { useCustomer } from "../hooks/use-customer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ListCustomers() {
  const { customers, isLoading } = useCustomer();
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Buscar cliente..." />
          </InputGroup>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="PF">Pessoa Física</SelectItem>
              <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Cidade/UF</TableHead>
                <TableHead className="text-right">Total de Compras</TableHead>
                <TableHead className="text-right">Total Gasto</TableHead>
                <TableHead className="text-right">Última Compra</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Carregando...
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                customers.length > 0 &&
                customers.map((customer) => {
                  const totalPurchases = customer.sales?.length || 0;
                  const totalSpent = customer.sales?.reduce(
                    (acc, sale) => acc + (Number(sale.total) || 0),
                    0
                  );
                  const lastPurchase = customer.sales?.[0]?.createdAt
                    ? new Date(
                        customer.sales?.[0]?.createdAt
                      ).toLocaleDateString()
                    : "N/A";

                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <span className="font-medium">{customer.name}</span>
                          <span className="text-xs text-muted-foreground font-mono">
                            {customer.document ? customer.document : ""}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {customer.personType === "FISICA"
                            ? "Pessoa Física"
                            : "Pessoa Jurídica"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <span className="text-sm">{customer.phone}</span>
                          <span className="">{customer.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {customer.city && customer.state
                          ? `${customer.city}/${customer.state}`
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <ShoppingBagIcon className="size-4 text-muted-foreground" />
                          <span className="font-medium">{totalPurchases}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {totalSpent}
                      </TableCell>
                      <TableCell className="text-right">
                        {lastPurchase}
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon">
                              <MoreVerticalIcon className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <EyeIcon className="size-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              <Trash2Icon className="size-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

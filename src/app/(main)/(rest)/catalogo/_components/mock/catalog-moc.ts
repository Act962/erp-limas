import { FreightChargeType, PaymentMethod } from "@/generated/prisma/enums";

export const tabs = [
  {
    id: "geral" as const,
    label: "Geral",
  },
  {
    id: "visibility" as const,
    label: "Visibilidade",
  },
  {
    id: "contact" as const,
    label: "Contato",
  },
  {
    id: "customization" as const,
    label: "Personalização",
  },
  {
    id: "payment" as const,
    label: "Pagamento",
  },
  {
    id: "delivery" as const,
    label: "Entrega",
  },
  {
    id: "social" as const,
    label: "Redes Sociais",
  },
  {
    id: "integrations" as const,
    label: "Integrações",
  },
];

export const SORT_ORDER = [
  {
    id: 1,
    method: "ASC",
    label: "Em ordem alfabética crescente de A a Z",
  },
  {
    id: 2,
    method: "DESC",
    label: "Em ordem alfabética decrescente de Z a A",
  },
  {
    id: 3,
    method: "NEWEST",
    label: "Em ordem crescente de mais recente para mais antigo",
  },
  {
    id: 4,
    method: "OLDEST",
    label: "Em ordem decrescente de mais antigo para mais recente",
  },
];

export const payments = [
  { id: "1", name: "PIX", method: PaymentMethod.PIX },
  { id: "2", name: "Dinheiro", method: PaymentMethod.DINHEIRO },
  { id: "3", name: "Transferência", method: PaymentMethod.TRANSFERENCIA },
  { id: "4", name: "Cartão de crédito", method: PaymentMethod.CREDITO },
  { id: "5", name: "Cartão de débito", method: PaymentMethod.DEBITO },
  { id: "6", name: "Boleto", method: PaymentMethod.BOLETO },
  { id: "7", name: "Link de pagamento", method: PaymentMethod.OUTROS },
];

export const freightOptions = [
  { id: "1", method: "NEGOTIATE_WHATSAPP", name: "Combinar via whatsapp" },
  { id: "2", method: "NEGOTIATE_FREIGHT", name: "Combinar valor de frete" },
  { id: "3", method: "FREE_SHIPPING", name: "Frete grátis" },
  { id: "4", method: "NO_SHIPPING", name: "Não oferecer frete" },
];

export const deliveryMethods = [
  { id: "1", method: "DELIVERY_HOME", name: "Entrega em domicílio" },
  { id: "2", method: "PICKUP_STORE", name: "Retirada na loja" },
  { id: "3", method: "ROOM_SERVICE", name: "Serviço de quarto" },
  { id: "4", method: "DIGITAL_DELIVERY", name: "Entrega digital" },
];

export const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

export const freightCharges = [
  { id: "1", name: "Fixo por pedido ", method: FreightChargeType.FIXED },
  { id: "2", name: "Valor por quilograma", method: FreightChargeType.PER_KG },
];

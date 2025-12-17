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
    name: "ASC",
    label: "Em ordem alfabética crescente de A a Z",
  },
  {
    id: 2,
    name: "DESC",
    label: "Em ordem alfabética decrescente de Z a A",
  },
  {
    id: 3,
    name: "NEWEST",
    label: "Em ordem crescente de mais recente para mais antigo",
  },
  {
    id: 4,
    name: "OLDEST",
    label: "Em ordem decrescente de mais antigo para mais recente",
  },
];

export const payments = [
  { id: 1, name: "PIX" },
  { id: 2, name: "Dinheiro" },
  { id: 3, name: "Transferência" },
  { id: 4, name: "Cartão de crédito" },
  { id: 5, name: "Cartão de débito" },
  { id: 6, name: "Boleto" },
  { id: 7, name: "Link de pagamento" },
];

export const delivery = [
  { id: "1", name: "Combinar via whatsapp" },
  { id: "2", name: "Combinar valor de frete" },
  { id: "3", name: "Frete grátis" },
  { id: "4", name: "Não oferecer frete" },
];

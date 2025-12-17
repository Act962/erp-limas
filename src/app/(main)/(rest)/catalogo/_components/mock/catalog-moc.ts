import {
  CreditCard,
  Eye,
  MessageCircle,
  Palette,
  Search,
  Share2,
} from "lucide-react";

export const tabs = [
  {
    id: "geral" as const,
    label: "Geral",
    icon: Search,
    description: "Configurações gerais",
  },
  {
    id: "visibility" as const,
    label: "Visibilidade",
    icon: Eye,
    description: "Controle o que é exibido",
  },
  {
    id: "contact" as const,
    label: "Contato",
    icon: MessageCircle,
    description: "Canais de comunicação",
  },
  {
    id: "customization" as const,
    label: "Personalização",
    icon: Palette,
    description: "Aparência do catálogo",
  },
  {
    id: "payment" as const,
    label: "Pagamento",
    icon: CreditCard,
    description: "Configurações de pagamento",
  },
  {
    id: "social" as const,
    label: "Redes Sociais",
    icon: Share2,
    description: "Conecte suas redes",
  },
  {
    id: "integrations" as const,
    label: "Integrações",
    icon: Share2,
    description: "Conecte seu catalogo a meta",
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

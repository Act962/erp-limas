import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, X } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface helperButtonSaleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: {
    productIsDisponile: boolean;
    showAsInCart: boolean;
  };
}

export function ButtonSale({
  data,
  ...props
}: helperButtonSaleProps): ReactNode {
  if (!data.productIsDisponile) {
    return (
      <Button variant="destructive" disabled {...props}>
        <X className="size-4" />
        Indisponível
      </Button>
    );
  }

  return (
    <Button {...props}>
      {data.showAsInCart ? "Adicionado" : "Adicionar"}
      {data.showAsInCart ? (
        <Check className="size-4" />
      ) : (
        <ShoppingBag className="size-4" />
      )}
    </Button>
  );
}

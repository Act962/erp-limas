import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryCustomer } from "../hooks/use-customer";
import { Spinner } from "@/components/ui/spinner";

interface ViewCustomerProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewCustomer = ({ id, open, onOpenChange }: ViewCustomerProps) => {
  const { customer, isLoading } = useQueryCustomer(id);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Detalhes do cliente</DialogTitle>
          <DialogDescription>
            Informações completas e histórico de compras
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Spinner />
            <span>Carregando...</span>
          </div>
        )}
        {!isLoading && customer && (
          <div>
            <div>
              <span>Nome:</span>
              <span>{customer.name}</span>
            </div>
            <div>
              <span>CPF/CNPJ:</span>
              <span>{customer.document}</span>
            </div>
            <div>
              <span>Telefone:</span>
              <span>{customer.phone}</span>
            </div>
            <div>
              <span>Email:</span>
              <span>{customer.email}</span>
            </div>
            <div>
              <span>Data de cadastro:</span>
              <span>{customer.address}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

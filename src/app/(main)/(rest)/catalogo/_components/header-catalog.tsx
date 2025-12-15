import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";

export function HeaderCatalog() {
  return (
    <div className="grid grid-cols-7 items-center justify-between w-full gap-2">
      <div className="flex col-span-2 gap-x-2 rounded-xl px-3 py-4 bg-accent-foreground/5">
        <div className="flex rounded-full p-2">
          <Store className="w-6 h-6" />
        </div>
        <div className="flex flex-col gap-y-2 gap-2">
          <h2 className="text-sm">
            Olá <strong>John</strong>
          </h2>
          <span className="text-xs">
            Aqui você pode personalizar como seus clientes verão seu catálogo
            online
          </span>
          <div className="flex flex-row items-center gap-x-2 text-xs h-7">
            Acesso rápido: <span>Alterar Logo</span>
            <Separator orientation="vertical" />
            <span>Alterar Banner</span>
          </div>
        </div>
      </div>
      <div className="col-span-3">Subcategorias</div>
      <div className="">Filtros</div>
      <div className="">Acciones</div>
    </div>
  );
}

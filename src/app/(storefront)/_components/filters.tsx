import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

export function FiltersCatalog() {
  const mockedCategories = [
    {
      name: "Informática",
      slug: "informatica",
      description: "Produtos de informática e acessórios",
      image: "https://picsum.photos/400/400?random=101",
    },
    {
      name: "Periféricos",
      slug: "perifericos",
      description: "Teclados, mouses e acessórios",
      image: "https://picsum.photos/400/400?random=102",
    },
    {
      name: "Monitores",
      slug: "monitores",
      description: "Monitores e telas profissionais",
      image: "https://picsum.photos/400/400?random=103",
    },
    {
      name: "Notebooks",
      slug: "notebooks",
      description: "Notebooks e laptops",
      image: "https://picsum.photos/400/400?random=104",
    },
    {
      name: "Gamers",
      slug: "gamers",
      description: "Produtos para setup gamer",
      image: "https://picsum.photos/400/400?random=105",
    },
    {
      name: "Smartphones",
      slug: "smartphones",
      description: "Celulares e acessórios",
      image: "https://picsum.photos/400/400?random=106",
    },
    {
      name: "Áudio",
      slug: "audio",
      description: "Fones, caixas de som e headsets",
      image: "https://picsum.photos/400/400?random=107",
    },
    {
      name: "Armazenamento",
      slug: "armazenamento",
      description: "HDs, SSDs e cartões de memória",
      image: "https://picsum.photos/400/400?random=108",
    },
    {
      name: "Móveis Gamer",
      slug: "moveis-gamer",
      description: "Cadeiras e mesas gamer",
      image: "https://picsum.photos/400/400?random=109",
    },
    {
      name: "Acessórios",
      slug: "acessorios",
      description: "Cabos, suportes e adaptadores",
      image: "https://picsum.photos/400/400?random=110",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Filter className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtre seus produtos aqui</SheetDescription>
        </SheetHeader>
        <ul className="flex-1 gap-3 px-4">
          <li>
            <input type="text" placeholder="Nome" />
          </li>
        </ul>
        <SheetFooter>
          <Button type="submit">Salvar</Button>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { FiltersCatalog } from "./filters";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Catalogo() {
  const mockedProducts = [
    {
      id: 1,
      name: "Notebook Gamer RTX 4050",
      salePrice: 5899.9,
      images: ["https://picsum.photos/400/400?random=1"],
    },
    {
      id: 2,
      name: "Mouse Sem Fio Logitech MX",
      salePrice: 249.9,
      images: ["https://picsum.photos/400/400?random=2"],
    },
    {
      id: 3,
      name: "Teclado Mecânico RGB",
      salePrice: 399.99,
      images: ["https://picsum.photos/400/400?random=3"],
    },
    {
      id: 4,
      name: 'Monitor 27" Full HD',
      salePrice: 1299.0,
      images: ["https://picsum.photos/400/400?random=4"],
    },
    {
      id: 5,
      name: "Headset Gamer 7.1",
      salePrice: 799.9,
      images: ["https://picsum.photos/400/400?random=5"],
    },
    {
      id: 6,
      name: "SSD NVMe 1TB",
      salePrice: 699.9,
      images: ["https://picsum.photos/400/400?random=6"],
    },
    {
      id: 7,
      name: "Cadeira Gamer Ergonômica",
      salePrice: 1599.0,
      images: ["https://picsum.photos/400/400?random=7"],
    },
    {
      id: 8,
      name: "Webcam Full HD",
      salePrice: 299.9,
      images: ["https://picsum.photos/400/400?random=8"],
    },
    {
      id: 9,
      name: "Caixa de Som Bluetooth",
      salePrice: 349.9,
      images: ["https://picsum.photos/400/400?random=9"],
    },
    {
      id: 10,
      name: "Smartphone Android 128GB",
      salePrice: 2499.0,
      images: ["https://picsum.photos/400/400?random=10"],
    },
  ];
  const mockedCategories = [
    {
      id: "cat_01",
      name: "Informática",
      slug: "informatica",
      description: "Produtos de informática e acessórios",
      image: "https://picsum.photos/400/400?random=101",
    },
    {
      id: "cat_02",
      name: "Periféricos",
      slug: "perifericos",
      description: "Teclados, mouses e acessórios",
      image: "https://picsum.photos/400/400?random=102",
    },
    {
      id: "cat_03",
      name: "Monitores",
      slug: "monitores",
      description: "Monitores e telas profissionais",
      image: "https://picsum.photos/400/400?random=103",
    },
    {
      id: "cat_04",
      name: "Notebooks",
      slug: "notebooks",
      description: "Notebooks e laptops",
      image: "https://picsum.photos/400/400?random=104",
    },
    {
      id: "cat_05",
      name: "Gamers",
      slug: "gamers",
      description: "Produtos para setup gamer",
      image: "https://picsum.photos/400/400?random=105",
    },
    {
      id: "cat_06",
      name: "Smartphones",
      slug: "smartphones",
      description: "Celulares e acessórios",
      image: "https://picsum.photos/400/400?random=106",
    },
    {
      id: "cat_07",
      name: "Áudio",
      slug: "audio",
      description: "Fones, caixas de som e headsets",
      image: "https://picsum.photos/400/400?random=107",
    },
    {
      id: "cat_08",
      name: "Armazenamento",
      slug: "armazenamento",
      description: "HDs, SSDs e cartões de memória",
      image: "https://picsum.photos/400/400?random=108",
    },
    {
      id: "cat_09",
      name: "Móveis Gamer",
      slug: "moveis-gamer",
      description: "Cadeiras e mesas gamer",
      image: "https://picsum.photos/400/400?random=109",
    },
    {
      id: "cat_10",
      name: "Acessórios",
      slug: "acessorios",
      description: "Cabos, suportes e adaptadores",
      image: "https://picsum.photos/400/400?random=110",
    },
  ];

  return (
    <main className="w-full flex items-center justify-center py-5">
      <div className="max-w-[1280px] flex flex-col w-full justify-between px-3">
        <div className="flex flex-row w-full items-center justify-between gap-x-3 py-4">
          <div />
          <h1 className="text-2xl font-bold">Catálogo</h1>
          <FiltersCatalog categories={mockedCategories} />
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={String(product.id)}
              name={product.name}
              salePrice={product.salePrice}
              images={product.images[0]}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

interface ProductProps {
  id: string;
  name: string;
  salePrice: number;
  images: string;
}

function ProductCard({ id, name, salePrice, images }: ProductProps) {
  return (
    <li
      id={id}
      className="flex flex-col items-center 
      gap-y-3 py-5 px-5 rounded-lg bg-accent-foreground/5 shadow-md hover:shadow-lg transition-shadow "
    >
      {images && (
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-sm"
          src={images}
          alt={name}
        />
      )}
      <div className="flex flex-col items-center w-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-medium font-semibold line-clamp-2 min-h-[50px]">
              {name}
            </h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>

        <p className="text-2xl font-bold">R$ {salePrice}</p>
      </div>
      <Button variant="outline">
        Adicionar <CirclePlus />
      </Button>
    </li>
  );
}

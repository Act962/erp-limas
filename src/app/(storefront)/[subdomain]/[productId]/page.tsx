import { DetailsPoduct } from "../../_components/delails-product";

export default function Page() {
  const product = {
    description:
      "O Notebook Gamer RTX 4050 oferece potência e tecnologia de ponta para quem busca máximo desempenho em jogos, estudos ou trabalho. Equipado com a placa de vídeo NVIDIA GeForce RTX 4050, ele garante gráficos incríveis, alta taxa de quadros e compatibilidade com as tecnologias mais recentes, como ray tracing e DLSS. Com design moderno e construção robusta, este notebook entrega uma experiência fluida em games AAA, softwares profissionais e atividades multitarefa. É a escolha ideal para gamers, criadores de conteúdo e usuários que exigem performance sem comprometer a mobilidade.",
    quantityInit: 1,
    categorySlug: "notebooks",
    id: "1",
    name: "Notebook Gamer RTX 4050",
    salePrice: 5899.9,
    thumbnail: "https://picsum.photos/400/400?random=1",
    images: [
      "https://picsum.photos/400/400?random=1",
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=3",
      "https://picsum.photos/400/400?random=4",
    ],
  };
  return <DetailsPoduct {...product} />;
}

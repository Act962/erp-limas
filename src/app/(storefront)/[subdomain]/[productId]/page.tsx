import { DetailsPoduct } from "../../_components/delails-product";

export default function Page() {
  return (
    <main className="">
      <DetailsPoduct
        quantityInit={1}
        categorySlug="notebooks"
        id="1"
        name="Notebook Gamer RTX 4050"
        salePrice={5899.9}
        thumbnail="https://picsum.photos/400/400?random=1"
        images={[
          "https://picsum.photos/400/400?random=1",
          "https://picsum.photos/400/400?random=2",
          "https://picsum.photos/400/400?random=3",
          "https://picsum.photos/400/400?random=4",
        ]}
      />
    </main>
  );
}

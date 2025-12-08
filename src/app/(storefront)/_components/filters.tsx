"use client";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/ui/shadcn-io/tags";
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
import { Check, Filter } from "lucide-react";
import { useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface FiltersCatalogProps {
  categories: Category[];
}

export function FiltersCatalog({
  categories: mockedCategories,
}: FiltersCatalogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modalOpen, setModalIsOpen] = useState(false);
  const [category, setCategory] = useQueryState("category", {
    defaultValue: `${mockedCategories[0].name}`,
  });

  const handleRemove = (id: string) => {
    if (!selectedIds.includes(id)) {
      return;
    }
    const category = mockedCategories.find((c) => c.id === id);
    console.log(`removed: ${category?.name}`);
    setSelectedIds((prev) => prev.filter((v) => v !== id));
  };

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      handleRemove(id);
      return;
    }
    setSelectedIds((prev) => [...prev, id]);
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  const getSelectedCategories = () => {
    return mockedCategories.filter((cat) => selectedIds.includes(cat.id));
  };

  const handleApplyFilters = () => {
    if (getSelectedCategories().length >= 1) {
      setCategory(
        getSelectedCategories()
          .map((cat) => cat.slug.toLowerCase())
          .join(",")
      );
    } else {
      setCategory(null);
    }
    setModalIsOpen(false);
  };

  return (
    <Sheet open={modalOpen} onOpenChange={setModalIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Filter className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full px-4">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtre seus produtos aqui</SheetDescription>
        </SheetHeader>
        <Tags className="w-full">
          <TagsTrigger placeholder="Buscar categoria...">
            {getSelectedCategories().map((currentCategory) => (
              <TagsValue
                key={currentCategory.id}
                onRemove={() => handleRemove(currentCategory.id)}
              >
                {currentCategory.name}
              </TagsValue>
            ))}
          </TagsTrigger>
          <TagsContent>
            <TagsInput placeholder="Selecionar categoria..." />
            <TagsList>
              <TagsEmpty />
              <TagsGroup>
                {mockedCategories.map((currentCategory) => (
                  <TagsItem
                    key={currentCategory.id}
                    onSelect={() => handleSelect(currentCategory.id)}
                    value={currentCategory.name}
                  >
                    {currentCategory.name}
                    {isSelected(currentCategory.id) && (
                      <Check className="text-muted-foreground" size={14} />
                    )}
                  </TagsItem>
                ))}
              </TagsGroup>
            </TagsList>
          </TagsContent>
        </Tags>
        <SheetFooter>
          <Button type="submit" onClick={handleApplyFilters}>
            Aplicar
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

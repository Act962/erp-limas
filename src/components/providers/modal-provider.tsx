"use client";

import { useEffect, useState } from "react";
import { CategoryFormDialog } from "../modals/category/category-form-dialog";
import { DeleteCategoryDialog } from "../modals/category/delete-category";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CategoryFormDialog />
      <DeleteCategoryDialog />
    </>
  );
}

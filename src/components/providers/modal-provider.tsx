"use client";

import { useEffect, useState } from "react";
import CreateProductModal from "../modals/create-product";

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
      <CreateProductModal />
    </>
  );
}

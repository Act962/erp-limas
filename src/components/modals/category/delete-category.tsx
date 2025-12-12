import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryModal } from "@/hooks/modals/use-category-modal";

export function DeleteCategoryDialog() {
  const { openDelete, onCloseDelete } = useCategoryModal();

  return (
    <Dialog open={openDelete} onOpenChange={onCloseDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Categoria</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

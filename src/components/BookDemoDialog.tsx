import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { BookDemoForm } from "./BookDemoForm";

type BookDemoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const BookDemoDialog = ({ open, onOpenChange }: BookDemoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl min-h-[500px]">
        <BookDemoForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default BookDemoDialog;

import React from "react";

import {CreateFlashcardForm} from "./create-flashcard-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface CreateFlashcardDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateFlashcardDialog({open, setOpen}: CreateFlashcardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create flashcard</DialogTitle>
          <DialogDescription>Select a topic and add a question & answer.</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <CreateFlashcardForm />
        </div>
        <DialogFooter>
          <Button className='w-full' form='create-flashcard-form' type='submit'>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export {CreateFlashcardDialog};

import React from "react";

import {CreateFlashcardForm} from "./create-flashcard-form";

import {Button} from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface CreateFlashcardDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateFlashcardDrawer({open, setOpen}: CreateFlashcardDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <div className='mx-auto w-full max-w-md'>
          <DrawerHeader>
            <DrawerTitle>Create flashcard</DrawerTitle>
            <DrawerDescription>Select a topic and add a question & answer.</DrawerDescription>
          </DrawerHeader>
          <div className='p-4 pb-0'>
            <CreateFlashcardForm />
          </div>
          <DrawerFooter>
            <Button className='w-full' form='create-flashcard-form' type='submit'>
              Create
            </Button>
            <DrawerClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export {CreateFlashcardDrawer};

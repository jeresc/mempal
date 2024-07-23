"use client";

import {useQueryClient} from "@tanstack/react-query";

import {createDocument} from "../api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | undefined;
}

function DocumentConfirmationDialog({open, onOpenChange, file}: FileUploadDialogProps) {
  const queryClient = useQueryClient();

  const onConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const createDocumentResult = await createDocument(file);

      if (createDocumentResult.error !== undefined)
        return {error: {message: createDocumentResult.error.message}};

      const docId = createDocumentResult?.success?.documentId;

      await queryClient.invalidateQueries({queryKey: ["documents"]});

      console.log(docId);
    } catch (e: unknown) {
      // Handle errors here
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>File to upload</AlertDialogTitle>
          <AlertDialogDescription>
            File name:
            <ul>
              <li>{file?.name}</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='uppercase'>Cancel</AlertDialogCancel>
          <form onSubmit={onConfirm}>
            <AlertDialogAction className='uppercase' type='submit'>
              Upload
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export {DocumentConfirmationDialog};

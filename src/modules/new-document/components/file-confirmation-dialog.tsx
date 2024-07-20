"use client";

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

function FileConfirmationDialog({open, onOpenChange, file}: FileUploadDialogProps) {
  const onConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();

      data.set("file", file);

      const res = await fetch("/api/file", {
        method: "POST",
        body: data,
      });

      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: unknown) {
      // Handle errors here
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas por imprimir un archivo</AlertDialogTitle>
          <AlertDialogDescription>
            Caracteristicas del archivo:
            <ul>
              <li>{file?.name}</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='uppercase'>Cancelar</AlertDialogCancel>
          <form onSubmit={onConfirm}>
            <AlertDialogAction className='uppercase' type='submit'>
              Imprimir
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export {FileConfirmationDialog};

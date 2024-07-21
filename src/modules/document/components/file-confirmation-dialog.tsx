"use client";

import {getSignedURL} from "~/document/actions/get-signed-url";

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
import {computeSHA256} from "@/lib/utils/compute-sha256";

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

      const checkSum = await computeSHA256(file);

      const signedUrlResult = await getSignedURL({
        type: file.type,
        size: file.size,
        checkSum,
      });

      if (signedUrlResult.error !== undefined) throw new Error(signedUrlResult.error.message);

      const {url, docId} = signedUrlResult.success;

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

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

export {FileConfirmationDialog};

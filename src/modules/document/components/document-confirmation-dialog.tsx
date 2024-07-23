"use client";

import {useRouter} from "next/navigation";
import React from "react";

import {useMutateDocuments} from "../hooks/use-mutate-documents";

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
import {generateFirestoreId} from "@/lib/utils/generate-id";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | undefined;
}

function DocumentConfirmationDialog({open, onOpenChange, file}: FileUploadDialogProps) {
  const router = useRouter();
  const {mutate} = useMutateDocuments();

  const onConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const docId = generateFirestoreId();

      mutate({file, docId});
      router.push(`/d/${docId}`);
    } catch (e: unknown) {
      // Handle errors here
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>File to upload</AlertDialogTitle>
          <AlertDialogDescription>File name: {file?.name}</AlertDialogDescription>
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

"use client";
import React, {useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import ReactTextareaAutosize from "react-textarea-autosize";

import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocument} from "~/document/hooks/use-document";
import {createFlashcardFormSchema as formSchema} from "~/flashcard/schemas";
import {adaptGeneratedFlashcard} from "~/flashcard/utils";
import {TopicsCombobox} from "~/flashcard/components/topics-combobox";

import {useAddFlashcards} from "../hooks/use-add-flashcards";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function CreateFlashcardForm() {
  const {docId} = useParamsDoc();
  const {document, isPending: isPendingDoc, error: errorDoc} = useDocument({docId});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
      topic: "",
    },
  });
  const {mutate: addFlashcards, isMutating: isMutatingFlashcards} = useAddFlashcards({
    deckId: document.deckId!,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const deckId = document.deckId;

    if (!deckId) return;

    const newFlashcard = adaptGeneratedFlashcard(values, deckId);

    addFlashcards({flashcards: [newFlashcard]});
    form.reset();
  }

  if (isMutatingFlashcards) return <div>Adding flashcards...</div>;

  return (
    <Form {...form}>
      <form className='space-y-4' id='create-flashcard-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='question'
          render={({field}) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <ReactTextareaAutosize
                  placeholder='Your question'
                  {...field}
                  className='flex min-h-[36px] w-full resize-none rounded-md border border-input bg-transparent px-3 pb-[7px] pt-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  maxRows={4}
                  minRows={1}
                />
              </FormControl>
              <FormDescription>This is the question of the flashcard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='answer'
          render={({field}) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <ReactTextareaAutosize
                  placeholder='Your answer'
                  {...field}
                  className='flex min-h-[36px] w-full resize-none rounded-md border border-input bg-transparent px-3 pb-[7px] pt-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                  maxRows={4}
                  minRows={1}
                />
              </FormControl>
              <FormDescription>This is the answer of the flashcard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <TopicsCombobox form={form} topics={[...document.topics!]} />
      </form>
    </Form>
  );
}

export {CreateFlashcardForm};

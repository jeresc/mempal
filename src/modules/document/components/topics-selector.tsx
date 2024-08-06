"use client";
import React from "react";
import {useRouter} from "next/navigation";
import {Cross1Icon} from "@radix-ui/react-icons";

import {useAddDocument} from "~/document/hooks/use-add-document";
import {useCreateDocument} from "~/document/store/create-document";
import {useSidebarStore} from "~/sidebar/store/sidebar";
import {useUpdateSubscription} from "~/subscription/hooks/use-update-subscription";
import {useSubscription} from "~/subscription/hooks/use-subscription";

import {generateFirestoreId} from "@/lib/utils/generate-id";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function TopicsSelector() {
  const router = useRouter();
  const {mutate: addDocument} = useAddDocument();
  const {mutate: updateSubscription} = useUpdateSubscription();
  const {subscription} = useSubscription();
  const [newTopic, setNewTopic] = React.useState("");
  const [file, text, charCount, topics, setTopics, reset, selectedRange] = useCreateDocument(
    (state) => [
      state.file,
      state.text,
      state.charCount,
      state.topics,
      state.setTopics,
      state.reset,
      state.selectedRange,
    ],
  );
  const [setTabToggled] = useSidebarStore((state) => [state.setTabToggled]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (!subscription) return;

    try {
      if (charCount > 50000 || !file || !text || !topics.length) return;

      const docId = generateFirestoreId();

      addDocument({
        file,
        docId,
        text,
        topics,
        startPage: selectedRange[0],
        endPage: selectedRange[1],
      });
      updateSubscription({
        data: {
          documentsCreated: subscription?.documentsCreated + 1,
        },
      });
      reset();
      router.push(`/d/${docId}`);
      setTabToggled(docId);
    } catch (e: unknown) {
      // Handle errors here
    }
  };

  return (
    <section className='flex h-full w-full flex-col justify-between gap-y-2'>
      <div className='flex w-full gap-x-2'>
        <Input
          className='flex w-full items-center justify-center rounded-md px-1 disabled:cursor-not-allowed disabled:opacity-30'
          disabled={!file || !text || charCount > 50000}
          placeholder='What is this document about? Enter the main topics'
          type='text'
          value={newTopic}
          onChange={(e) => setNewTopic(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.currentTarget.value.length === 0) return;
            if (e.key === "Enter") {
              setTopics((prevTopics) => [...prevTopics, e.currentTarget.value]);
              setNewTopic("");
            }
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData("text");

            if (text.length === 0) return;
            const pastedTopics = text.split("\n").filter((topic) => topic.length > 0);

            setTopics((prevTopics) => [...prevTopics, ...pastedTopics]);
            setNewTopic("");
          }}
        />
        <Button
          disabled={!newTopic}
          onClick={() => {
            setTopics((prevTopics) => [...prevTopics, newTopic]);
            setNewTopic("");
          }}
        >
          Add topic
        </Button>
      </div>
      <div className='flex h-full w-full flex-wrap content-start items-start justify-start gap-2'>
        {topics.map((topic, index) => {
          return (
            <button
              /* eslint-disable-next-line react/no-array-index-key */
              key={topic + index}
              className='flex w-fit items-center justify-between gap-1.5 rounded-md border px-2 py-0.5 disabled:cursor-not-allowed disabled:opacity-30'
              type='button'
              onClick={() => setTopics((prevTopics) => prevTopics.filter((_, i) => i !== index))}
            >
              <span className='overflow-hidden text-ellipsis whitespace-nowrap'>{topic}</span>
              <Cross1Icon className=' h-3 w-3 text-gray-500' />
            </button>
          );
        })}
      </div>
      <form onSubmit={onSubmit}>
        <Button
          className='flex w-full items-center justify-center rounded-md border px-1 py-0.5 disabled:cursor-not-allowed disabled:opacity-30'
          disabled={
            !file || !text || charCount > 50000 || !topics.length || topics.join("").length > 5000
          }
          type='submit'
        >
          Submit
        </Button>
      </form>
    </section>
  );
}

export {TopicsSelector};

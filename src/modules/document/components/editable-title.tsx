"use client";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import {useCallback, useEffect, useState} from "react";
import {useDebounceValue} from "usehooks-ts";

import {useMutateDocument} from "../hooks/use-mutate-document";

import {cn} from "@/lib/utils/cn";

function EditableTitle({title, id}: {title: string; id: string}) {
  const [content, setContent] = useState(title);
  const [debouncedTitle, setDebouncedTitle] = useDebounceValue(title, 1000);
  const {mutateDocument} = useMutateDocument({docId: id, initialData: {title}});

  useEffect(() => {
    if (content === title) return;
    setDebouncedTitle(content);
  }, [content, setDebouncedTitle, title]);

  useEffect(() => {
    if (debouncedTitle !== title) mutateDocument({data: {title: debouncedTitle}});
  }, [debouncedTitle, mutateDocument, title]);

  const onContentChange = useCallback(
    (evt: React.FormEvent<HTMLDivElement>) => {
      const sanitizeConf = {
        allowedTags: ["b", "i", "a", "p"],
      };

      setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
    },
    [setContent],
  );

  return (
    <div className='relative'>
      <ContentEditable
        className='min-h-[40px] text-4xl font-medium'
        html={content}
        tagName='h1'
        onBlur={onContentChange}
        onChange={onContentChange}
      />
      <span
        className={cn(
          "semibold absolute left-0 top-0 -z-10 text-4xl font-medium text-foreground/15",
          content != "" && "hidden",
        )}
      >
        Untitled
      </span>
    </div>
  );
}

export {EditableTitle};

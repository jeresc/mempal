"use client";
import sanitizeHtml from "sanitize-html";
import ContentEditable from "react-contenteditable";
import {useCallback, useRef, useState} from "react";

import {cn} from "@/lib/utils/cn";

function EditableTitle({title}: {title: string} = {title: ""}) {
  const [content, setContent] = useState(title);

  const onContentChange = useCallback((evt: React.FormEvent<HTMLDivElement>) => {
    const sanitizeConf = {
      allowedTags: ["b", "i", "a", "p"],
    };

    setContent(sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf));
  }, []);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <div className='relative'>
      <ContentEditable
        className='min-h-[40px] text-4xl font-medium'
        html={content}
        innerRef={titleRef}
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

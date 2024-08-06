"use client";

import {TbCards} from "react-icons/tb";
import {useEffect} from "react";
import data from "@emoji-mart/data/sets/15/twitter.json";
import {init} from "emoji-mart";
import {usePathname} from "next/navigation";

import {useParamsDoc} from "~/document/hooks/use-params-doc";
import {useDocuments} from "~/document/hooks/use-documents";
import {LinkItem} from "~/sidebar/components/link-item";
import {CreateButton} from "~/sidebar/components/create-button";
import {AccountCapsule} from "~/sidebar/components/account-capsule";

import {useSidebarStore} from "../store/sidebar";

import {DocumentItem} from "./document-item";
import {DocumentItemSkeleton} from "./document-item-skeleton";

// const tabs = ["chat", "deck", "summary"];
const tabs = ["chat", "deck"];
const links = [{href: "/flashcards", icon: <TbCards size={18} />, text: "Flashcards"}];

init({data});

function Sidebar() {
  const {isPending, error, documents} = useDocuments();
  const {docId} = useParamsDoc();
  const [setTabToggled] = useSidebarStore((state) => [state.setTabToggled]);
  const pathname = usePathname();

  useEffect(() => {
    if (docId) {
      const currentTab = tabs.find((tab) => pathname.endsWith(`${docId}/${tab}`));

      if (currentTab) setTabToggled(docId);
    }
  }, [pathname, docId, setTabToggled]);

  return (
    <aside className='flex h-full w-full flex-col gap-5 p-2 px-1 text-sm text-foreground/80'>
      <AccountCapsule />
      <div className='flex w-full flex-col gap-0.5'>
        {links.map(({href, icon, text}) => (
          <LinkItem key={href} href={href} icon={icon} text={text} />
        ))}
        <CreateButton />
      </div>
      {error ? <p>An error has occurred: {error.message}</p> : null}
      <div className='flex flex-col gap-0.5'>
        {/*eslint-disable-next-line react/no-array-index-key*/}
        {isPending ? [...Array(10)].map((_, i) => <DocumentItemSkeleton key={i} />) : null}
        {documents?.length > 0 &&
          documents.map(({id, title}) => (
            <DocumentItem key={id} id={id} pathname={pathname} title={title} />
          ))}
      </div>
    </aside>
  );
}

export {Sidebar};

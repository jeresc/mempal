import {CirclePlus} from "lucide-react";

function CreateButton() {
  return (
    <button
      className='mt-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-bold text-foreground hover:cursor-pointer hover:bg-primary/80'
      type='button'
    >
      <CirclePlus size={20} />
      Create new
    </button>
  );
}

export {CreateButton};

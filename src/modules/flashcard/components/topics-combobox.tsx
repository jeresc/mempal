"use client";

import {CaretSortIcon} from "@radix-ui/react-icons";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {Check} from "lucide-react";
import {useState} from "react";

import {createFlashcardFormSchema as formSchema} from "~/flashcard/schemas";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

interface TopicsComboboxProps {
  topics: string[];
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export function TopicsCombobox({topics, form}: TopicsComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name='topic'
      render={({field}) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Topic</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    "w-full justify-between pl-3 text-sm",
                    !field.value && "text-muted-foreground",
                  )}
                  role='combobox'
                  variant='outline'
                >
                  <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
                    {field.value ? topics.find((topic) => topic === field.value) : "Select a topic"}
                  </span>
                  <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='p-0 xs:w-[416px] sml:mx-0 sml:w-[375px]' side='top'>
              <Command>
                <CommandInput className='h-9' placeholder='Search topic' />
                <CommandList>
                  <CommandEmpty>No topic found.</CommandEmpty>
                  <CommandGroup>
                    {topics.map((topic) => (
                      <CommandItem
                        key={topic}
                        value={topic}
                        onSelect={() => {
                          form.setValue("topic", topic);
                          setOpen(false);
                        }}
                      >
                        {topic}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            topic === field.value ? "opacity-100" : "opacity-0",
                          )}
                          size={16}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/*<FormDescription>This is the topic that will be used in the dashboard.</FormDescription>
           */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

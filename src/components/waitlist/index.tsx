"use client";

import type {z} from "zod";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {waitlistSchema} from "@/schemas";

export function WaitlistForm() {
  //   // 1. Define your form.
  const form = useForm<z.infer<typeof waitlistSchema>>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof waitlistSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="mt-3 flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              {/* <FormLabel className="sr-only">Email</FormLabel> */}
              <FormControl>
                <Input
                  className="bg-[rgb(255,255,255,.3)] text-base placeholder:text-base"
                  placeholder="juani@papu.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button
          className="bg-primary px-3 py-2 text-lg text-white transition-all duration-300"
          type="submit"
        >
          Join Waitlist
        </Button>
      </form>
    </Form>
  );
}

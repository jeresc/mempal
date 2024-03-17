"use client";

import type {z} from "zod";
import type {SubmitErrorHandler} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import confetti from "canvas-confetti";
import {toast} from "sonner";
import {MailCheck, MailWarning} from "lucide-react";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {WaitlistSchema} from "@/schemas";
import {useWaitlistStore} from "@/lib/store/waitlist";

import {registerWaitlistUser} from "./actions";

function WaitlistForm() {
  const setHasJoinedWaitlist = useWaitlistStore((state) => state.setHasJoinedWaitlist);

  //   // 1. Define your form.
  const form = useForm<z.infer<typeof WaitlistSchema>>({
    resolver: zodResolver(WaitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof WaitlistSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    registerWaitlistUser(values)
      .then((data) => {
        if (data.error) {
          toast(
            <div className="flex items-center gap-2 font-outfit text-base leading-none text-[#0009]">
              <MailWarning size={18} /> <p>{data.error}</p>
            </div>,
          );
        }

        if (data.success) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: {y: 0.6},
            colors: ["#cffafe", "#bae6fd", "#4b73ff"],
          });

          toast.info(
            <div className="flex items-center gap-2 font-outfit text-base leading-none text-sky-600">
              <MailCheck className="h-6 w-6" />
              <p> Thanks for joining our waitlist, we&apos;ll be in touch shortly.</p>
            </div>,
          );

          setHasJoinedWaitlist(true);
        }
      })
      .catch(() => {
        form.reset();
        toast(
          <div className="flex items-center gap-2 font-outfit text-base leading-none text-[#0009]">
            <MailWarning size={18} /> <p>Something went wrong, try again later</p>
          </div>,
        );
      });
  }

  const onError: SubmitErrorHandler<z.infer<typeof WaitlistSchema>> = (errors) => {
    if (errors.email)
      toast(
        <div className="flex items-center gap-2 font-outfit text-base leading-none text-[#0009]">
          <MailWarning size={18} /> <p>{errors.email.message}</p>
        </div>,
      );
  };

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form className="mt-3 flex gap-2" onSubmit={form.handleSubmit(onSubmit, onError)}>
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

export {WaitlistForm};

"use client";

import type {z} from "zod";
import type {SubmitErrorHandler} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import confetti from "canvas-confetti";
import {toast} from "sonner";
import {LoaderCircle, MailWarning} from "lucide-react";
import {useTransition} from "react";

import {registerWaitlistUser} from "./actions";

import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {WaitlistSchema} from "@/schemas";
import {useWaitlistStore} from "@/lib/store/waitlist";

function WaitlistForm() {
  const setHasJoinedWaitlist = useWaitlistStore((state) => state.setHasJoinedWaitlist);
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      registerWaitlistUser(values)
        .then((data) => {
          if (data.error) {
            toast(
              <div className='flex items-center gap-2 font-outfit text-base leading-none text-[#0009]'>
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

            setHasJoinedWaitlist(true);
          }
        })
        .catch(() => {
          form.reset();
          toast(
            <div className='flex items-center gap-2 font-outfit text-base leading-none text-[#0009]'>
              <MailWarning size={18} /> <p>Something went wrong, try again later</p>
            </div>,
          );
        });
    });
  }

  const onError: SubmitErrorHandler<z.infer<typeof WaitlistSchema>> = (errors) => {
    if (errors.email)
      toast(
        <div className='flex items-center gap-2 font-outfit text-base leading-none text-[#0009]'>
          <MailWarning size={18} /> <p>{errors.email.message}</p>
        </div>,
      );
  };

  return (
    <Form {...form}>
      {}
      <form className='mt-3 flex gap-2' onSubmit={form.handleSubmit(onSubmit, onError)}>
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  className='bg-[rgb(255,255,255,.3)] text-base shadow-sm placeholder:text-base'
                  disabled={isPending}
                  placeholder='name@email.com'
                  type='email'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className='px-3 py-2 text-lg text-white shadow transition-all duration-300'
          disabled={isPending}
          type='submit'
        >
          {isPending ? (
            <>
              <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </>
          ) : (
            "Join Waitlist"
          )}
        </Button>
      </form>
    </Form>
  );
}

export {WaitlistForm};

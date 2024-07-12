"use client";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReloadIcon} from "@radix-ui/react-icons";

import {CardWrapper} from "~/auth/components/card-wrapper";
import {reset} from "~/auth/actions/reset";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ResetSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
// import {FormError} from "@/components/form/form-error";
// import {FormSuccess} from "@/components/form/form-success";

export function ResetForm() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      backButtonHref='/auth/login'
      backButtonLabel='Back to login'
      headerLabel='Forgot your password?'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      {...field}
                      disabled={isPending}
                      placeholder='john.doe@example.com'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} /> */}
          {/* <FormSuccess message={success} /> */}
          <Button className='w-full' disabled={isPending} type='submit'>
            {isPending ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            {isPending ? "Sending email" : "Send reset email"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

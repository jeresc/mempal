"use client";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useSearchParams} from "next/navigation";

import {CardWrapper} from "~/auth/components/card-wrapper";
import {newPassword} from "~/auth/actions/new-password";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {NewPasswordSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
// import {FormError} from "@/components/form/form-error";
// import {FormSuccess} from "@/components/form/form-success";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      backButtonHref='/login'
      backButtonLabel='Back to login'
      backButtonTrigger=''
      headerLabel='Enter a new password'
      headerTitle='Password Reset'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      disabled={isPending}
                      placeholder='•••••••••••••'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      {...field}
                      disabled={isPending}
                      placeholder='•••••••••••••'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} /> */}
          {/* <FormSuccess message={success} /> */}
          <Button className='w-full' disabled={isPending} size='lg' type='submit'>
            {isPending ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            {isPending ? "Please wait" : "Reset password"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

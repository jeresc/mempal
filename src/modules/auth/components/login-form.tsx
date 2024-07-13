"use client";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReloadIcon} from "@radix-ui/react-icons";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

import {CardWrapper} from "~/auth/components/card-wrapper";
import {FormError} from "~/auth/components/form-error";
import {FormSuccess} from "~/auth/components/form-success";
import {login} from "~/auth/actions/login";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {LoginSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          form.reset();
          setError("Something went wrong. Please try again later.");
        });
    });
  };

  return (
    <CardWrapper
      showSocial
      backButtonHref='/register'
      backButtonLabel='New to Mempal?'
      backButtonTrigger='Create an account.'
      headerLabel='Welcome back'
      headerTitle='Log In'
    >
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            {showTwoFactor ? (
              <FormField
                control={form.control}
                name='code'
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} {...field} placeholder='' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {!showTwoFactor && (
              <>
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

                <FormField
                  control={form.control}
                  name='password'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          type='password'
                          {...field}
                          placeholder='•••••••••••••'
                        />
                      </FormControl>
                      <Button asChild className='px-0 text-sm font-normal' size='sm' variant='link'>
                        <Link href='/reset'>Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className='w-full' disabled={isPending} size='lg' type='submit'>
            {isPending ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            {isPending ? "Please wait" : showTwoFactor ? "Confirm" : "Log In"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

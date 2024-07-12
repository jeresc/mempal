"use client";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReloadIcon} from "@radix-ui/react-icons";

import {CardWrapper} from "~/auth/components/card-wrapper";
import {register} from "~/auth/actions/register";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {RegisterSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
// import {FormError} from "@/components/form/form-error";
// import {FormSuccess} from "@/components/form/form-success";

export function RegisterForm() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      showSocial
      backButtonHref='/login'
      backButtonLabel='¿Ya tienes cuenta en Trabajito?'
      headerTitle='Crea una cuenta'
    >
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-2'>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Nombre</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} type='fname' {...field} placeholder='Nombre' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastname'
                render={({field}) => (
                  <FormItem>
                    <FormLabel className='sr-only'>Apellido</FormLabel>
                    <FormControl>
                      <Input disabled={isPending} type='lname' {...field} placeholder='Apellido' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel className='sr-only'>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} disabled={isPending} placeholder='Email' />
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
                  <FormLabel className='sr-only'>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type='password'
                      {...field}
                      placeholder='Contraseña'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} /> */}
          {/* <FormSuccess message={success} /> */}
          <Button className='w-full font-bold' disabled={isPending} type='submit'>
            {isPending ? <ReloadIcon className='mr-2 h-4 w-4 animate-spin' /> : null}
            {isPending ? "Por favor espera" : "REGISTER"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

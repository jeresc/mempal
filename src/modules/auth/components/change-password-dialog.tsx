"use client";
import React, {useState, useTransition} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {toast} from "sonner";

import {changePassword} from "~/auth/actions/change-password";

import {ChangePasswordSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {FormField, FormItem, FormLabel, FormControl, FormMessage, Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

const formFields: {
  name: keyof z.infer<typeof ChangePasswordSchema>;
  label: string;
}[] = [
  {
    label: "Current Password",
    name: "currentPassword",
  },
  {
    label: "New Password",
    name: "newPassword",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
  },
];

export function ChangePasswordDialog() {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      changePassword(values)
        .then((data) => {
          setError(data.error);

          if (data.error) {
            form.resetField("currentPassword");
          }

          if (data.success) {
            toast.success(data.success);
            setOpen(false);
            form.reset();
          }
        })
        .catch(() => {
          form.reset();
          setError("Something went wrong please try again later.");
        });
    });
  };

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='2xs:w-auto h-8 w-full px-2 text-[13px] sm:h-9 sm:px-3 sm:text-sm'
          size='sm'
          variant='outline'
        >
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>Please enter your current and new password</DialogDescription>
              <div className='space-y-4 sm:space-y-2'>
                {formFields.map((formField) => (
                  <FormField
                    key={formField.name}
                    control={form.control}
                    name={formField.name}
                    render={({field}) => (
                      <FormItem className='relative flex flex-col items-end justify-center first:mt-4'>
                        <div className='flex w-full flex-col items-start justify-between gap-2 sm:flex-row sm:items-center'>
                          <FormLabel className='text-balance text-left sm:w-full sm:max-w-[124px]'>
                            {formField.label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder='•••••••••••••'
                              type='password'
                            />
                          </FormControl>
                        </div>
                        <FormMessage className='absolute -top-[11px] right-0 text-left sm:static' />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </DialogHeader>

            <DialogFooter className='flex w-full flex-col !justify-between gap-6 sm:flex-row'>
              {/* <FormError message={error} className='py-2' /> */}
              <Button
                className='flex items-center justify-center gap-1 sm:!ml-auto'
                disabled={isPending}
                type='submit'
              >
                {isPending ? (
                  <>
                    Please wait
                    <Loader2 className='h-4 w-4 animate-spin' />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

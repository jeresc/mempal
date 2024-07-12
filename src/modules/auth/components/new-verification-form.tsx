"use client";

import {ScaleLoader} from "react-spinners";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";

import {newVerification} from "~/auth/actions/new-verification";

import {CardWrapper} from "./card-wrapper";

// import {FormError} from "~/components/form/form-error";
// import {FormSuccess} from "@/components/form/form-success";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onVerify = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");

      return;
    }

    await newVerification(token)
      .then(({error, success}) => {
        setError(error);
        setSuccess(success);
      })
      .catch(() => {
        setError("Something went wrong!");
        setSuccess("");
      });
  }, [token, success, error]);

  useEffect(() => {
    onVerify();
  }, [onVerify]);

  return (
    <CardWrapper
      backButtonHref='/auth/login'
      backButtonLabel='Go back to Login'
      headerLabel='Verifying your email'
    >
      <div className='flex w-full items-center justify-center'>
        {!error && !success && <ScaleLoader color='currentColor' />}
        {/* <FormSuccess message={success} /> */}
        {/* {!success && <FormError message={error} />} */}
      </div>
    </CardWrapper>
  );
}

import { useQueryClient } from "@tanstack/react-query";
import React, { FormEventHandler, useRef } from "react";
import ErrorMessage from "components/shared/error-message";
import FormButton from "components/shared/form-button";
import Input from "components/shared/input";
import { useLoginMutation, useMeQuery } from "lib/react-query/hooks";
import { setLocalStorage } from "lib/utils";
import { LS_KEY_NAME } from "lib/constants";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: login,
    error: loginError,
    isLoading: loginIsLoading,
  } = useLoginMutation({ queryClient });
  const { data: me } = useMeQuery({ queryClient });
  const loginRef = useRef<HTMLFormElement>(null);

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!loginRef.current) return;

    const formData = new FormData(loginRef.current);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return;
    }

    try {
      const res = await login({ email, password });
      setLocalStorage(LS_KEY_NAME, res.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      ref={loginRef}
      className='grid gap-4 grid-cols-1'
    >
      <Input
        className='rounded-md w-full'
        labelClassName='text-white'
        label='Email'
        type='email'
        name='email'
        id='login-email'
        labelFor='login-email'
        required
      />
      <Input
        className='rounded'
        label='Password'
        type='password'
        name='password'
        id='login-password'
        labelFor='login-password'
        required
      />
      <FormButton>
        {loginIsLoading ? "Logging in..." : "Submit Login"}
      </FormButton>
      <ErrorMessage error={loginError} />
    </form>
  );
};

export default LoginForm;

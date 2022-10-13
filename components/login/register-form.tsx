import { useMutation } from "@tanstack/react-query";
import React, { FormEventHandler, useRef } from "react";
import { accountFetchers } from "lib/react-query/fetchers";
import ErrorMessage from "components/shared/error-message";
import FormButton from "components/shared/form-button";
import Input from "components/shared/input";

const RegisterForm = () => {
  const {
    mutateAsync: register,
    error: registerError,
    isLoading: registerIsLoading,
  } = useMutation(accountFetchers.mutations.registerUser);
  const registerRef = useRef<HTMLFormElement>(null);

  const handleRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!registerRef.current) return;

    const formData = new FormData(registerRef.current);
    const email = formData.get("email");
    const password = formData.get("password");
    const displayName = formData.get("displayName");
    const userName = formData.get("username");

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof displayName !== "string" ||
      typeof userName !== "string"
    ) {
      return;
    }

    try {
      const res = await register({ email, password, displayName, userName });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form ref={registerRef} onSubmit={handleRegister} className='grid gap-4 '>
      <div className='grid gap-4 grid-cols-2'>
        <Input label='Username' type='text' name='username' required />
        <Input label='Display Name' type='text' name='displayName' required />
      </div>
      <Input
        label='Email'
        type='email'
        name='email'
        id='register-email'
        labelFor='register-email'
        required
      />
      <Input
        id='register-password'
        labelFor='register-password'
        label='Password'
        type='password'
        name='password'
        required
      />
      <FormButton>
        {registerIsLoading ? "Registering..." : "Submit Registration"}
      </FormButton>
      <ErrorMessage error={registerError} />
    </form>
  );
};

export default RegisterForm;

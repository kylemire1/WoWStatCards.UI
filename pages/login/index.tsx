import React from "react";
import { Layout } from "components/shared/layout";
import LoginForm from "components/login/login-form";
import RegisterForm from "components/login/register-form";
import { OnlyChildren } from "lib/types";
import { GetServerSideProps } from "next";
import { canUseDom } from "lib/utils";

const LoginPage = () => {
  return (
    <Layout>
      <Layout.Container>
        <div className='grid grid-cols-2 gap-4'>
          <FormWrapper>
            <FormTitle>Login</FormTitle>
            <LoginForm />
          </FormWrapper>
          <FormWrapper>
            <FormTitle>Register</FormTitle>
            <RegisterForm />
          </FormWrapper>
        </div>
      </Layout.Container>
    </Layout>
  );
};

const FormTitle = ({ children }: OnlyChildren) => {
  return (
    <h2 className='text-center text-blue-500 text-3xl font-bold  mb-8'>
      {children}
    </h2>
  );
};

const FormWrapper = ({ children }: OnlyChildren) => {
  return (
    <div className='relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-10 shadow-xl sm:px-8 sm:py-12'>
      {children}
    </div>
  );
};

export default LoginPage;

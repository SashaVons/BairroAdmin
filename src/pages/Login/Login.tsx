import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../components/FormInput/FormInput";
import { useHistory } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

interface LoginProps {
  fetchAuthUser: (email: string, password: string, history: any) => void;
}

export const Login: FC<LoginProps> = ({ fetchAuthUser }) => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: LoginForm) => {
    fetchAuthUser(data.email, data.password, history);
  };
  return (
    <>
      <div className="Login-Header">
        <h1 className="Login-Header-Title">Welcome to Bairro Admin</h1>
      </div>
      <div className="Login-Form">
        <h1 className="Login-Form-Title">Login</h1>
        <form
          className="Login-Form-Container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            placeholder={"Email"}
            name={"email"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <FormInput
            placeholder={"Password"}
            name={"password"}
            errors={errors}
            register={register}
            required={{ required: true }}
          />
          <input type="submit" className="Login-Form-Button" />
        </form>
      </div>
    </>
  );
};

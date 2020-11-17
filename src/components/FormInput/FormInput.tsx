import React, { FC } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import "./form-input.scss";

interface FormInputProps {
  placeholder: string;
  errors: DeepMap<Record<string, any>, FieldError>;
  name: string;
  register: any;
  required: any;
  customStyle?: any;
  onChange?: any;
}

export const FormInput: FC<FormInputProps> = ({
  placeholder,
  errors,
  name,
  register,
  required,
  customStyle,
  onChange,
}) => {
  return (
    <div className="Container" style={customStyle}>
      <input
        className={`Container-Input ${
          errors[name] ? "Container-Input-Error" : ""
        }`}
        name={name}
        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
        placeholder={placeholder}
        ref={register(required)}
      />
      <div className={`Error ${errors[name] ? "Error-Trans" : ""}`}>
        {errors[name] && <b className="Error-Text">Value required</b>}
      </div>
    </div>
  );
};

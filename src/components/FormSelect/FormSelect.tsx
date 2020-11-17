import React, { FC } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import "./form-select.scss";

interface FormSelectProps {
  placeholder: string;
  errors: DeepMap<Record<string, any>, FieldError>;
  options: Array<any>;
  name: string;
  register: any;
  required: any;
  onChange?: any;
}

export const FormSelect: FC<FormSelectProps> = ({
  placeholder,
  errors,
  name,
  register,
  options,
  required,
  onChange,
}) => {
  return (
    <>
      <select
        className={`Select ${errors[name] ? "Select-Error" : ""}`}
        name={name}
        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
        placeholder={placeholder}
        ref={register(required)}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options.map((item) => (
          <option value={item._id}>{item.name}</option>
        ))}
      </select>
      <div className={`Error ${errors[name] ? "Error-Trans" : ""}`}>
        {errors[name] && <b className="Error-Text">Value required</b>}
      </div>
    </>
  );
};

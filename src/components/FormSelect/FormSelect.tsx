import React, { FC } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import "./form-select.scss";

interface FormSelectProps {
  placeholder?: string;
  errors: any;
  name: string;
  control: any;
  options: any;
  required: any;
  onChangeAction?: (value: any) => void;
  defaultValue?: any;
  multi?: boolean;
}

export const FormSelect: FC<FormSelectProps> = ({
  placeholder,
  errors,
  name,
  control,
  options,
  required,
  onChangeAction,
  defaultValue,
  multi,
}) => {
  return (
    <Controller
      control={control}
      style={{ width: "100%", marginBottom: 24 }}
      name={name}
      render={({ onChange, onBlur, value, name, ref }) => (
        <Select
          className={"Select"}
          onChange={(e: any) => {
            if (onChangeAction) onChangeAction(e.value);
            onChange(e);
          }}
          value={value}
          isMulti={multi ? multi : false}
          placeholder={placeholder}
          options={options}
        />
      )}
      defaultValue={
        defaultValue
          ? options.filter((el: any) => el.value === defaultValue)[0]
          : null
      }
    />
  );
};

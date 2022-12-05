import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context";
import { getSetError } from "../../hooks/hooks";
import { ErrorField } from "./ErrorField";
import Input, { InputProps } from "./Input";

const InputMapper: React.FC<{
  data: InputProps[];
}> = ({ data }) => {
  const { setField } = useContext(UserContext);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validationErrors = useMemo(() => {
    return Object.entries(errors || {}).map(([key, value]) => ({
      key,
      value,
    }));
  }, [errors]);

  const setError = getSetError(errors, setErrors);

  const updateUserInfo = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const correctValue = value.split(".").join("");
    setField(name, correctValue);
  };
  const updateUserInfoAndErrorField = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const correctValue =
      name !== "name"
        ? Number.parseInt(value.split(".").join(""))
        : value.split(".").join("");
    setField(name, correctValue);
    setError(name, correctValue);
  };

  return (
    <div>
      {data.map((props) => (
        <Input
          disabled={props.disabled || false}
          key={props.name}
          type={props.type}
          name={props.name}
          currencyField={props.type === "currency"}
          defaultValue={props.defaultValue}
          onChange={updateUserInfo}
          onBlur={updateUserInfoAndErrorField}
          labelname={props.labelname}
          placeholder={props.placeholder}
          errorField={ErrorField(
            validationErrors.find((error) => error.key === props.name)
          )}
        />
      ))}
    </div>
  );
};

export default InputMapper;

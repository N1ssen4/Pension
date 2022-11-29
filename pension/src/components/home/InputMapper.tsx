import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { User } from "../../types/User";
import Input, { InputProps } from "./Input";

const InputMapper: React.FC<{
  data: InputProps[];
}> = ({ data }) => {
  const { contextUser, setContextUser } = useContext(UserContext);

  const [user, setUser] = useState<User>({
    name: "",
    age: null,
    salary: null,
    pensionSaving: null,
    pensionPayment: null,
    publicPensionAge: null,
    wantedPensionAge: null
  });

  const updateUserInfo = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    const correctValue = value.split(".").join("")
    setUser((prev) => {
      return { ...prev, [name]: correctValue };
    });
    setContextUser(user);
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
          onBlur={updateUserInfo}
          labelname={props.labelname}
          placeholder={props.placeholder}
        />
      ))}
    </div>
  );
};

export default InputMapper;

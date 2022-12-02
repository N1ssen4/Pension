import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { z, ZodError } from "zod";
import { User } from "../types/User";
import { validationObject } from "../utils/inputvalidation";

type TUserContext = {
  user: User;
  setUser: (user: User) => void;
  // or
  setField: (name: string, value: any) => void; // sync local storage
  //
  checkValidation: (key: string, value: any) => void;
  // .. More methods as needed
  dataIsValid: (user: User) => boolean | undefined;
  errors?: Record<string, string>;
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
};
const UserContext = createContext<TUserContext>({
  setField: () => {},
  setUser: () => {},
  user: {} as User,
  checkValidation: () => {},
  dataIsValid: () => false,
});

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getInitialUser = () => {
    const user =
      typeof window !== "undefined" ? localStorage.getItem("User") : null;
    return user
      ? JSON.parse(user)
      : {
          name: "",
          age: null,
          salary: null,
          pensionSaving: null,
          pensionPayment: null,
          publicPensionAge: null,
          wantedPensionAge: null,
        };
  };
  const [user, setUser] = React.useState<User>(getInitialUser);

  const setField = (name: string, value: any) => {
    if (name !== "name") {
      setUser({ ...user, [name]: Number.parseFloat(value) });
    } else setUser({ ...user, [name]: value});
    
  };

  const checkValidation = (key: string, value: any) => {
    try {
      validationObject.pick({ [key]: true }).parse({
        [key]: value,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues.map((error) => error.message).toString())
      }
    }
  };

  const dataIsValid = (user: User) => {
    try {
      validationObject.parse(user)
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return false;
  }}}

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, setField, checkValidation, dataIsValid }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };

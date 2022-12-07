import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { z } from "zod";
import { User } from "../types/User";
import { validationSchema } from "../utils/inputvalidation";

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
    return user ? JSON.parse(user) : { wantedPensionAge: 66};
    
  };

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    setUser(getInitialUser());
  }, []);

  const setField = (name: string, value: any) => {
    if (name !== "name") {
      setUser({ ...user, [name]: Number.parseFloat(value) });
    } else setUser({ ...user, [name]: value });
  };

  const checkValidation = (key: string, value: any) => {
    try {
      validationSchema.pick({ [key]: true }).parse({
        [key]: value,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues.map((error) => error.message).toString());
      }
    }
  };

  const dataIsValid = (user: User) => {
    try {
      validationSchema.parse(user);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return false;
      }
    }
  };

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

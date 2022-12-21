import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { z, ZodObject } from "zod";
import { User } from "../types/User";
import { validationSchemaPensionPage } from "../utils/inputvalidation";
import { v4 as uuidv4 } from "uuid";

//Usercontextfile where all the context functions are defined.
type TUserContext = {
  user: User;
  setUuid: (value: string) => void;
  setUser: (user: User) => void;
  setField: (name: string, value: any) => void;
  checkValidation: (key: string, value: any) => void;
  dataIsValid: (schema: any, user: User) => boolean | undefined;
  errors?: Record<string, string>;
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>;
};

//Creating the context from the User type.
const UserContext = createContext<TUserContext>({
  setField: () => {},
  setUser: () => {},
  user: {} as User,
  checkValidation: () => {},
  dataIsValid: () => false,
  setUuid: () => {},
});

//Initializing my provider with all the defined functions.
const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //Check if the user has any data in local storage, and if not then initialize
  //a new user with pensionage preset to 66.
  const getInitialUser = () => {
    const user =
      typeof window !== "undefined" ? localStorage.getItem("User") : null;
    return user ? JSON.parse(user) : {};
  };
  //State for handling the user

  const [user, setUser] = useState<User>({} as User);

  //Calling the getInitialUser funtion on pageload and reloads.
  useEffect(() => {
    setUser(getInitialUser());
  }, []);

  //Setting a Uuid for the user for pensure
  const setUuid = () => {
    if (!localStorage.getItem("pensureID")) {
      localStorage.setItem("pensureID", uuidv4());
    }
  };
  //Funtion for setting the userfields when typing into fields.
  const setField = (name: string, value: any) => {
    let updatedUser;
    if (name !== "name") {
      updatedUser = Object.assign({}, user, {
        [name]: Number.parseFloat(value),
      });
    } else {
      updatedUser = Object.assign({}, user, { [name]: value });
    }
    setUser(updatedUser);
    console.log(user)
  };

  //checking if the data on the individual inputs are valid and if not throwing an error.
  const checkValidation = (key: string, value: any) => {
    try {
      validationSchemaPensionPage.pick({ [key]: true }).parse({
        [key]: value,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.issues.map((error) => error.message).toString());
      }
    }
  };
  //funtion that checks if the users data is correct according to the validation schema.
  const dataIsValid = (Schema: any, user: User) => {
    try {
      Schema.parse(user);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return false;
      }
    }
  };

  //Syncing/setting the user data with local storage every time the user data changes.
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  //Generating a unique ID that is used for collecting pensiondata from Pensure.
  useEffect(() => {
    setUuid();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, setField, checkValidation, dataIsValid, setUuid }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };

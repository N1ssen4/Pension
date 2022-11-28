import { createContext } from "react";
import { User } from "../types/User";

export const UserContext = createContext<User>({
  name: "",
  age: null,
  salary: null,
  pensionSaving: null,
  pensionPayment: null,
  publicPensionAge: null,
  wantedPensionAge: null,
});
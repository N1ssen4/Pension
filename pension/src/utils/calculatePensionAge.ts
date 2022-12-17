import { useContext } from "react";
import { UserContext } from "../context";

//calculating the pension age.
export const pensionAge = () => {
  const { user } = useContext(UserContext);
  if (user.birthYear !== null) {
    if (user.birthYear <= 1955) {
      return 66;
    } else if (user.birthYear >= 1955 && user.birthYear < 1963) {
      return 67;
    } else if (user.birthYear >= 1963 && user.birthYear < 1967) {
      return 68;
    } else if (user.birthYear >= 1967 && user.birthYear < 1971) {
      return 69;
    } else if (user.birthYear >= 1971 && user.birthYear < 1975) {
      return 70;
    } else if (user.birthYear >= 1975 && user.birthYear < 1979) {
      return 71;
    } else return 72;
  }
  else return 0
}
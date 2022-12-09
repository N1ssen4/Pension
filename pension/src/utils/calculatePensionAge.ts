import { birthYear } from "./birthyear";

//calculating the pension age.
export const pensionAge = (age: number | null) => {

    if (birthYear(age) <= 1955) {
      return 66;
    } else if (birthYear(age) >= 1955 && birthYear(age) < 1963) {
      return 67;
    } else if (birthYear(age) >= 1963 && birthYear(age) < 1967) {
      return 68;
    } else if (birthYear(age) >= 1967 && birthYear(age) < 1971) {
      return 69;
    } else if (birthYear(age) >= 1971 && birthYear(age) < 1975) {
      return 70;
    } else if (birthYear(age) >= 1975 && birthYear(age) < 1979) {
      return 71;
    } else return 72;
}
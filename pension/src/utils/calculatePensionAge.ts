import { birthYear } from "./birthyear";

//calculating the pension age.
export const pensionAge = (age: number | null) => {

    if (birthYear(age) <= 1954) {
      return 66;
    } else if (birthYear(age) <= 1955) {
      return 67;
    } else if (birthYear(age) < 1962) {
      return 68;
    } else if (birthYear(age) < 1966) {
      return 69;
    } else if (birthYear(age) < 1970) {
      return 70;
    } else if (birthYear(age) < 1974) {
      return 71;
    } else return 72;
}
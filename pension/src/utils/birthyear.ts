
//Funtion to calculate the birthYear of a user from the age they inputted.
export const birthYear = (age : number | null) => {
  const currentAge = age !== null ? age : 0;
  const today = new Date();
  const year = today.getFullYear();
  return year - currentAge;
};

export const birthYear = (age : number | null) => {
  const currentAge = age !== null ? age : 0;
  const today = new Date();
  const year = today.getFullYear();
  return year - currentAge;
};


// Function for formatting numbers to be more readable for the user. 
export const numberWithCommas = (x:number | null | "") => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

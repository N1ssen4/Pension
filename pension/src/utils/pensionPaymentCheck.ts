 //Checking that the user is not paying more than 80 percent of their salary to pension. 
export const PensionPaymentCheck = (
  salary: number | null,
  pensionPayment: number | null
) => {
  const salaryLimit = salary != null ? salary * 0.8 : 0;
  return pensionPayment != null ? pensionPayment > salaryLimit : false;
};
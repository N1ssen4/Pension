import {z} from 'zod'
//Dreamplans Own validation schemas for the calculations from Keylane. 

//NOT MADE BY ME
//-------------------------------------------------------------------------------------------------------
export const ZHousingOutput = z.object({
  averageMonthlyInstallmentUntilPension: z.number(),
  debtFactor: z.number(),
  houseEquityAtPension: z.number(),
});

export const ZHousingBaselineAndRecommendedOutput = z.object({
  baseline: ZHousingOutput,
  monthlyPaymentDifference: z.number(),
  recommendation: ZHousingOutput,
});

export const ZPensionPerson = z.object({
  netMonthlyPayment: z.number(),
  coverageRatio: z.number(),
  netPensionDepotAtPension: z.number(),
  grossMonthlyPayment: z.number(),
});

export type PensionPerson = z.infer<typeof ZPensionPerson>;

export const ZPensionHouseholdOutput = z.object({
  householdNetMonthlyPayment: z.number(),
  householdCoverageRatio: z.number().optional().nullable(),
  householdPensionDepotSum: z.number(),
  householdGrossMonthlyPayment: z.number(),
  personTwo: ZPensionPerson.optional().nullable(),
  personOne: ZPensionPerson,
});

export type PensionHouseholdOutput = z.infer<typeof ZPensionHouseholdOutput>;

const ZPensionHouseholdDelta = z.object({
  householdGrossMonthlyPaymentDifference: z.number().optional().nullable(),
  householdNetMonthlyPaymentDifference: z.number().optional().nullable(),
  householdNetPensionDepotAtRetirementDifference: z.number().nullish(),
});

export const ZPensionBaselineAndRecommendedOutput = z.object({
  baseline: ZPensionHouseholdOutput,
  householdDelta: ZPensionHouseholdDelta,
  recommendation: ZPensionHouseholdOutput,
});

export const ZEmergencySavingsOutput = z.object({
  liquidityFactorOfSalary: z.number(),
  liquiditySumAtPension: z.number(),
  monthlySavings: z.number(),
});

export const ZEmergencySavingsBaselineAndRecommendedOutput = z.object({
  baseline: ZEmergencySavingsOutput,
  emergencySavingsDifferenceWithInitial: z.number(),
  recommendation: ZEmergencySavingsOutput,
});

export const ZCalculateResponse = z.object({
  debtFactorPayments: ZHousingBaselineAndRecommendedOutput,
  liquiditySalaryRatioPayments: ZEmergencySavingsBaselineAndRecommendedOutput,
  pensionCoverageRatioPayments: ZPensionBaselineAndRecommendedOutput,
});
export type CalculateResponse = z.infer<typeof ZCalculateResponse>;

export const ZCalculationResultParts = z.object({
  assetValueAtPension: z.number(),
  initialTarget: z.number(),
  monthlyPayment: z.number(),
  status: z.union([
    z.literal("TargetResultsInNegativeInstallment"),
    z.literal("TargetResultsInInstallmentLessThanTheAnnualInterest"),
    z.literal("Success"),
    z.literal("SuccessInitialTarget"),
  ]),
  target: z.number(),
});

export const ZCalculate = z.object({
  key: z.string(),
  part: z.number(),
  sliderStartPosition: z.number(),
  sliderCurrentPosition: z.number(),
  results: z.array(ZCalculationResultParts),
});

export const ZCalculateSet = z.object({
  originDomain: z.string(),
  timestamp: z.string().or(z.date()),
  results: ZCalculateResponse,
  version: z.number(),
  parts: z.array(ZCalculate).optional().nullable(),
});
//-------------------------------------------------------------------------------------------------------



// Validation schemas for the data we send to Keylane to get the correct response. 
export const primaryUserData = z.object({
  birthYear: z.number().min(1900).max(2022),
  currentPensionSavings: z.number().min(1).max(10000000),
  monthlyPensionPayment: z.number().min(1).max(1000000),
  monthlySalary: z.number().min(1).max(1000000),
  pensionAge: z.number().min(66).max(87)
})

export const shareHouseAndLiabilityUserData = z.object({
  houseInterest: z.number(),
  houseValue: z.number(),
  housingDataYear: z.number(),
  liabilityInterest: z.number(),
  liabilityPrincipal: z.number(),
  liabilityRemainingRepaymentFreeYears: z.number(),
  liabilityRemainingTenure: z.number(),
})

export const savingsUserData = z.object({
  currentEmergencySavings: z.number(),
  monthlySavings: z.number(),
});

export const CheckUserDataToKeylane = z.object({
  primary: primaryUserData,
  sharedHouseAndLiability: shareHouseAndLiabilityUserData,
  savings: savingsUserData,
});



export type CalculateSet = z.infer<typeof ZCalculateSet>;

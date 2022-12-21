//Dreamplans PayloadSkeleton for typesafe response from KeyLane.

//NOT MADE BY ME
//-------------------------------------------------------------------------------------------------------
export interface PayloadSkeleton {
  primary: PrimaryUserPayload;
  sharedHouseAndLiability: SharedHouseAndLiability;
  savings: {
    currentEmergencySavings: number;
    monthlySavings: number;
  };
}

export interface PrimaryUserPayload {
  birthYear: number | null;
  currentPensionSavings: number | null;
  monthlyPensionPayment: number | null;
  monthlySalary: number | null;
  pensionAge: number | null;
  voluntaryPayment: number;
}

export interface SharedHouseAndLiability {
  houseInterest: number;
  houseValue: number;
  housingDataYear: number;
  liabilityInterest: number;
  liabilityPrincipal: number;
  liabilityRemainingRepaymentFreeYears: number;
  liabilityRemainingTenure: number;
}
//-------------------------------------------------------------------------------------------------------

import { CalculateSet } from "./CalculationTypes";
import { PayloadSkeleton } from "./KeylanePayloadSkeleton";

//Calculation function for fetching calculations from Keylane. 
export const GetCalculations = async (
  keylanePayload: PayloadSkeleton,
  hostname: string
  
): Promise<CalculateSet>  => {
  try {
    
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICES_API_URL}/api/CalculateTargetPrices`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-url": `${process.env.NEXT_PUBLIC_SERVICES_API_URL}`,
        },
        body: JSON.stringify(keylanePayload),
        
      },
      
    )
    .then((response) => response.json());
    if (result && result.errors) {
      console.log(result);
      console.log("FEJL UDREGNING", JSON.stringify(result.errors));
      return result.errors;
    }
    return {
      version: 1,
      timestamp: new Date(),
      originDomain: hostname,
      results: result,
    };
  } catch (err) {
    console.log(err);
    console.log("FEJL UDREGNING", JSON.stringify(err));
    return err as any;
  }
};

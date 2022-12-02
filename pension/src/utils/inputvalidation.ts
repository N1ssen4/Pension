import { z } from "zod";

export const validationObject = z.object({
  name: z
    .string()
    .min(1, { message: "Påkrævet felt" })
    .max(100, { message: "Maximalt 100 karakterer" }),
  age: z
    .number({
      invalid_type_error: "Påkrævet felt",
      required_error: "Påkrævet felt",
    })
    .min(18, { message: "Du skal være mindst 18 år" })
    .max(100, { message: "Værdi skal være mellem 18 og 100 år" }),
  salary: z
    .number({
      invalid_type_error: "Påkrævet felt",
      required_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(1000000, { message: "Max 1.000.000kr." }),
  pensionSaving: z
    .number({
      invalid_type_error: "Påkrævet felt",
      required_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(10000000, { message: "Max 10.000.000kr." }),
  pensionPayment: z
    .number({
      invalid_type_error: "Påkrævet felt",
      required_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(1000000, { message: "Max 1.000.000kr." }),
});

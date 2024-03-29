import { z } from "zod";

// Zod validation schema to validate data bot when going from the
// inputpage to the pension page and when trying to book a metting on the pension page.
export const validationSchemaHomePage = z.object({
  name: z
    .string()
    .min(1, { message: "Påkrævet felt" })
    .max(100, { message: "Maximalt 100 karakterer" }),
  birthYear: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1922, { message: "Værdi skal være mellem 18 og 100 år" })
    .max(2004, { message: "Du skal være mindst 18 år" }),
  salary: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(1000000, { message: "Max 1.000.000 kr." }),
  pensionSaving: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(10000000, { message: "Max 10.000.000 kr." }),
  pensionPayment: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(1000000, { message: "Max 1.000.000 kr." }),
});

export const validationSchemaPensionPage = z.object({
  name: z
    .string()
    .min(1, { message: "Påkrævet felt" })
    .max(100, { message: "Maximalt 100 karakterer" }),
  birthYear: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1922, { message: "Værdi skal være mellem 18 og 100 år" })
    .max(2004, { message: "Du skal være mindst 18 år" }),
  salary: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(1000000, { message: "Max 1.000.000 kr." }),
  pensionSaving: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(10000000, { message: "Max 10.000.000 kr." }),
  pensionPayment: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(1, { message: "Feltet skal have en værdi højere end 0 kr." })
    .max(1000000, { message: "Max 1.000.000 kr." }),
  wantedPensionAge: z
    .number({
      required_error: "Påkrævet felt",
      invalid_type_error: "Påkrævet felt",
    })
    .min(66, { message: "Min 66 år" })
    .max(87, { message: "Mellem 60 og 87 år" }),
});
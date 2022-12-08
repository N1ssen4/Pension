import { validationSchema } from "./inputvalidation";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

// Function to handle the errors from the validation schema
export const errorHandler = (
  keyValue: { key: string; value: string | number },
  setError?: (value: any) => void,
  errors?: Record<string, string>
) => {
  const { key, value } = keyValue;
  try {
    validationSchema.pick({ [key]: true }).parse({ [key]: value });

    if (errors) {
      delete errors[key];
    }
    if (setError){
      setError({...errors});
    }
  } catch (err) {
    if (setError) {
      setError({
        ...errors,
        [key]: fromZodError(err as ZodError)
          .message.split(":")[1]
          ?.replaceAll(`at "${key}"`, ""),
      });
    }
  }
};

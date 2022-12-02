import { validationObject } from "./inputvalidation";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

export const errorHandler = (
  keyValue: { key: string; value: string | number },
  setError?: (value: any) => void,
  errors?: Record<string, string>
) => {
  const { key, value } = keyValue;
  try {
    validationObject.pick({ [key]: true }).parse({ [key]: value });

    if (errors) {
      delete errors[key];
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

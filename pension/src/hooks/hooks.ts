import { Dispatch, SetStateAction } from "react";
import { errorHandler } from "../utils/errorHandler";

export const getSetError = (
  errors?: Record<string, string>,
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>
) => {
  return (fieldName: string, value: string | number) => {
    errorHandler({ key: fieldName, value: value }, setErrors, errors);
  };
};

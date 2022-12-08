import { Dispatch, SetStateAction } from "react";
import { errorHandler } from "../utils/errorHandler";


//hook for the error handler when setting errors. 
export const getSetError = (
  errors?: Record<string, string>,
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>
) => {
  return (fieldName: string, value: string | number) => {
    errorHandler({ key: fieldName, value: value }, setErrors, errors);
  };
};

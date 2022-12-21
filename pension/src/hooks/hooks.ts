import { Dispatch, SetStateAction } from "react";
import { errorHandler } from "../utils/errorHandler";

//hook that handles errors and setting new errors. Updating the 'errors' state triggers a re-render of the errors when displaying them to the user.
export const getSetError = (
  errors?: Record<string, string>,
  setErrors?: Dispatch<SetStateAction<Record<string, string>>>
) => {
  return (fieldName: string, value: string | number) => {
    errorHandler({ key: fieldName, value: value }, setErrors, errors);
  };
};

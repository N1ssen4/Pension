import { Dispatch, SetStateAction } from "react";
import { errorHandler } from "../utils/errorHandler";

export const getSetField = (
   errors?: Record<string, string>,
   setErrors?: Dispatch<SetStateAction<Record<string, string>>>, 
) => {
    return (fieldName: string, value: string | number) => {
        errorHandler(fieldName,value,setErrors,errors)
   
}}
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context";
import { getSetError } from "../../hooks/hooks";
import { birthYear } from "../../utils/birthyear";
import { PensionAgeCheck } from "../../utils/PensionAgeCheck";
import { ErrorField } from "../home/ErrorField";

const PensionInputAge = () => {
  //Initialize context.
  const { setField, user } = useContext(UserContext);
  //Initialize error states.
  const [errors, setErrors] = useState<Record<string, string>>({});
  //funtion to look through the errormap and displaying them to the user.
  const validationErrors = useMemo(() => {
    return Object.entries(errors || {}).map(([key, value]) => ({
      key,
      value,
    }));
  }, [errors]);
  const setError = getSetError(errors, setErrors);

  //Funtion for calculation the public pension year.
  const publicPensionYear = () => {
    if (isNaN(birthYear(user.age) + pensionAge())) return "YYYY";
    return birthYear(user.age) + pensionAge();
  };
  //Funtion for calculation the wanted pension year.
  const wantedPensionYear = () => {
    if (user?.wantedPensionAge != null)
      if (isNaN(user?.wantedPensionAge)) return "YYYY";
      else return birthYear(user.age) + Number(user?.wantedPensionAge);
    else return "YYYY";
  };

  //calculating the pension age.
  const pensionAge = () => {
    if (birthYear(user.age) <= 1954) {
      return 66;
    } else if (birthYear(user.age) <= 1955) {
      return 67;
    } else if (birthYear(user.age) < 1962) {
      return 68;
    } else if (birthYear(user.age) < 1966) {
      return 69;
    } else if (birthYear(user.age) < 1970) {
      return 70;
    } else if (birthYear(user.age) < 1974) {
      return 71;
    } else return 72;
  };
  
  //Updating the wanted pension age.
  const updatePensionAgeAndErrorField = (e: any) => {
    const value = e.target.value;
    setField("wantedPensionAge", value);
    setError("wantedPensionAge", Number.parseInt(value));
  };

  return (
    <>
      <div className="flex justify-between text-center font-semibold">
        <div>
          <label className="mx-6 flex">Folkepensions-alder</label>
          <input
            id="publicPensionAge"
            name="publicPensionAge"
            className="w-[145px] rounded-full border py-2 text-center font-bold"
            type="number"
            placeholder="Antal år"
            disabled={true}
            defaultValue={pensionAge()}
          />
          <div className="font-normal text-[#8E9197]">
            {publicPensionYear()}
          </div>
        </div>
        <div>
          <label className="mx-6 flex">Ønsket Pensionsalder</label>
          <input
            name="wantedPensionAge"
            className="w-[145px] rounded-full border py-2 text-center font-normal focus:font-bold"
            type="number"
            placeholder="Antal år"
            onBlur={updatePensionAgeAndErrorField}
            defaultValue={user?.wantedPensionAge || 0}
          />
          {!PensionAgeCheck(user.age, user.wantedPensionAge) ? (
            validationErrors.find(
              (error) => error.key === "wantedPensionAge"
            ) ? (
              <div className="relative ">
                {ErrorField(
                  validationErrors.find(
                    (error) => error.key === "wantedPensionAge"
                  )
                )}
              </div>
            ) : (
              <div className="font-normal text-[#8E9197]">
                {wantedPensionYear()}
              </div>
            )
          ) : (
            <div className="text-sm text-red-700">
              <p>Skal være højere end din alder</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PensionInputAge;

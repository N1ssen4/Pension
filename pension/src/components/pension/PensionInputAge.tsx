import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context";
import { getSetError } from "../../hooks/hooks";
import { pensionAge } from "../../utils/calculatePensionAge";
import { PensionAgeCheck } from "../../utils/PensionAgeCheck";
import { ErrorField } from "../home/ErrorField";
import { InfoModal } from "../home/InfoModal";

const PensionInputAge = () => {
  const [isModalOpen, setModalState] = React.useState(false);
  const toggleModal = () => setModalState(!isModalOpen);

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
    if (user?.birthYear !== null) {
      if (isNaN(user?.birthYear)) {
        return "YYYY";
      } else return user?.birthYear + pensionAge();
    } else return "YYYY";
  };
  //Funtion for calculation the wanted pension year.
  const wantedPensionYear = () => {
    if (user?.wantedPensionAge != null && user?.birthYear != null) {
      if (isNaN(user?.wantedPensionAge)) {
        return "YYYY";
      } else return user?.birthYear + user?.wantedPensionAge;
    } else return "YYYY";
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
          <div className="flex">
          <label data-test-id="publicPensionAge" className="mx-6 flex">
            Folkepensions-alder
          </label>
          <button className="-ml-4" onClick={toggleModal}>
            <QuestionMarkCircleIcon
              id="navn"
              className="h-[17px] w-[17px] stroke-[#8E9197]"
            />
          </button>
          </div>
          <InfoModal isOpen={isModalOpen} onclose={toggleModal}>
            Folkepensionsalderen er blot vejledende og kan være anderledes. 
          </InfoModal>
          <input
            data-test-id-input="publicPensionAge"
            id="publicPensionAge"
            name="publicPensionAge"
            className="w-[145px] rounded-full border py-2 text-center font-bold"
            type="number"
            placeholder="Antal år"
            disabled={true}
            defaultValue={pensionAge()}
          />
          <div
            data-test-id="publicPensionYear"
            className="font-normal text-[#8E9197]"
          >
            {publicPensionYear()}
          </div>
        </div>
        <div>
          <label data-test-id="wantedPensionAge" className="mx-6 flex">
            Ønsket Pensionsalder
          </label>
          <input
            data-test-id-input="wantedPensionAge"
            name="wantedPensionAge"
            className="w-[145px] rounded-full border py-2 text-center font-normal focus:font-bold"
            type="number"
            placeholder="Antal år"
            onBlur={updatePensionAgeAndErrorField}
            defaultValue={user?.wantedPensionAge || 0}
          />
          {!PensionAgeCheck(user.birthYear, user.wantedPensionAge) ? (
            validationErrors.find(
              (error) => error.key === "wantedPensionAge"
            ) ? (
              <div data-test-id="wantedPensionAgeError" className="relative ">
                {ErrorField(
                  validationErrors.find(
                    (error) => error.key === "wantedPensionAge"
                  )
                )}
              </div>
            ) : (
              <div
                data-test-id="wantedPensionYear"
                className="font-normal text-[#8E9197]"
              >
                {wantedPensionYear()}
              </div>
            )
          ) : (
            <div
              data-test-id="wantedPensionAgeError2"
              className="text-sm text-red-700"
            >
              <p>Skal være højere end din alder</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PensionInputAge;

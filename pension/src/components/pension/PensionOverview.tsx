import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { UserContext } from "../../context/UserContext";
import { numberWithCommas } from "../../utils/numberformatter";
import PensionDiagram from "./PensionDiagram";

const PensionOverview = () => {
  const { contextUser, setContextUser } = useContext(UserContext);
  const [leftFieldInFocus, setLeftFieldInFocus] = useState(false);
  const [rightFieldInFocus, setRightFieldInFocus] = useState(true);
  const [fieldWasUpdated, setFieldWasUpdated] = useState(false);


  const updatePensionPayment = (e: any) => {
    const name = "pensionPayment";
    const value = e.target.value;
    const correctValue = value.split(".").join("");
    setContextUser((prev: any) => {
      return { ...prev, [name]: correctValue };
    });
    setLeftFieldInFocus(false);
    setFieldWasUpdated(true)
  };

  if (fieldWasUpdated) {
    localStorage.setItem("User", JSON.stringify(contextUser));
  }

  return (
    <>
      <div className="flex justify-between text-center">
        <div className="w-[107px]">
          <div className="space-y-5">
            <ArrowLongDownIcon className="mx-auto h-[25px]" />
            <label className="font-semibold">Indbetaling</label>
            <CurrencyInput
              id="pensionPayment"
              name="pensionPayment"
              defaultValue={contextUser?.pensionPayment}
              key={`pensionPayment:${contextUser?.pensionPayment}`}
              groupSeparator="."
              decimalSeparator=","
              className={
                leftFieldInFocus
                  ? "w-[107px] rounded-full border py-2 text-center"
                  : "w-[107px] rounded-full border py-2 text-center font-bold"
              }
              placeholder="pr. måned"
              onClick={() => setLeftFieldInFocus(true)}
              onBlur={updatePensionPayment}
            />
            <p className={!leftFieldInFocus ? "font-bold" : ""}>
              {numberWithCommas(contextUser?.pensionPayment)} kr.
            </p>
            {!leftFieldInFocus ? (
              <LockClosedIcon className="mx-auto h-[22px] stroke-[#000000] stroke-2" />
            ) : (
              <LockOpenIcon className="mx-auto h-[22px] stroke-[#BEC1CA] stroke-2" />
            )}
          </div>
        </div>
        <div className="w-[71px]">
          <PensionDiagram />
        </div>
        <div className="w-[107px]">
          <div className="space-y-5">
            <ArrowLongUpIcon className="mx-auto h-[25px]" />
            <label className="font-semibold">Udbetaling</label>
            <CurrencyInput
              groupSeparator="."
              decimalSeparator=","
              className={
                rightFieldInFocus
                  ? "w-[107px] rounded-full border py-2 text-center"
                  : "w-[107px] rounded-full border py-2 text-center font-bold"
              }
              placeholder="pr. måned"
              onClick={() => setRightFieldInFocus(true)}
              onBlur={() => setRightFieldInFocus(false)}
            />
            <p className={!rightFieldInFocus ? "font-bold" : ""}>[Beløb] kr.</p>
            {!rightFieldInFocus ? (
              <LockClosedIcon className="mx-auto h-[22px] stroke-[#000000] stroke-2" />
            ) : (
              <LockOpenIcon className="mx-auto h-[22px] stroke-[#BEC1CA] stroke-2" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PensionOverview;

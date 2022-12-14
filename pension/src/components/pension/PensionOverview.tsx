import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useMemo, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { UserContext } from "../../context";
import { getSetError } from "../../hooks/hooks";
import { birthYear } from "../../utils/birthyear";
import { GetCalculations } from "../../utils/calculations/Calculations";
import { CheckUserDataToKeylane } from "../../utils/calculations/CalculationTypes";
import { PayloadSkeleton } from "../../utils/calculations/KeylanePayloadSkeleton";
import { numberWithCommas } from "../../utils/numberformatter";
import { ErrorField } from "../home/ErrorField";
import PensionDiagram from "./PensionDiagram";
import { BeatLoader } from "react-spinners";

const PensionOverview = () => {
  //initialize userContext
  const { user, setField } = useContext(UserContext);
  //initialize states
  const [leftFieldInFocus, setLeftFieldInFocus] = useState(false);
  const [rightFieldInFocus, setRightFieldInFocus] = useState(false);
  const [fieldWasUpdated, setFieldWasUpdated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false)

  //funtion to look through the errormap and displaying them to the user.
  const validationErrors = useMemo(() => {
    return Object.entries(errors || {}).map(([key, value]) => ({
      key,
      value,
    }));
  }, [errors]);
  const setError = getSetError(errors, setErrors);

  //Updating the PensionPaymentField.
  const updatePensionPayment = (e: any) => {
    const name = "pensionPayment";
    const value = e.target.value;
    const correctValue = value.split(".").join("");
    setField(name, correctValue);
    setLeftFieldInFocus(false);
    setFieldWasUpdated(true);
    setError(name, Number.parseInt(correctValue));
  };

  if (fieldWasUpdated) {
    localStorage.setItem("User", JSON.stringify(user));
  }
  //Checking the pensionpayment object and making sure it's not null or NaN value.
  const pensionPayment = () => {
    if (user?.pensionPayment != null) {
      if (isNaN(user.pensionPayment)) return "";
      else return numberWithCommas(user.pensionPayment);
    }
  };
  //Checking that the coverage ratio and salary is not null then rounding the number.  
  const pensionPaymentOut = () => {
    if (user?.coverageRatio && user?.salary != null )
      return Math.round(user.salary * user.coverageRatio)
    return ""
  }
  //Define the user skeleton with context information.
  const currentUser: PayloadSkeleton = {
    primary: {
      birthYear: birthYear(user.age),
      currentPensionSavings: user.pensionSaving,
      monthlyPensionPayment: user.pensionPayment,
      monthlySalary: user.salary,
      pensionAge: user.wantedPensionAge,
      voluntaryPayment: 0,
    },
    sharedHouseAndLiability: {
      houseInterest: 0,
      houseValue: 1,
      housingDataYear: 2022,
      liabilityInterest: 0,
      liabilityPrincipal: 0,
      liabilityRemainingRepaymentFreeYears: 0,
      liabilityRemainingTenure: 0,
    },
    savings: {
      currentEmergencySavings: 0,
      monthlySavings: 0,
    },
  };
  //fetching the calculations and getting the coverage ratio from Keylane. 
  const KeylaneResult = async () => {
    const UserDataCheck = CheckUserDataToKeylane.safeParse(currentUser);
    if (UserDataCheck.success) {
      setLoading(true);
      const resultKeylane = await GetCalculations(
        currentUser,
        JSON.stringify(process.env.NEXT_PUBLIC_SERVICES_API_URL)
      );
      setLoading(false)
      const coverageRatio =
        resultKeylane.results.pensionCoverageRatioPayments.baseline.personOne
          .coverageRatio;
      setField("coverageRatio", coverageRatio);
      
    }
  };
  //Caling the calculationg everytime the user changes their pension age or payment. 
  useEffect(() => {
    KeylaneResult();
  }, [user.pensionPayment, user.wantedPensionAge]);

  return (
    <>
      <div className="flex justify-between text-center">
        <div className="w-[107px]">
          <div className="space-y-5">
            <ArrowLongDownIcon
              data-test-id="arrowDown"
              className="mx-auto h-[25px]"
            />
            <label data-test-id="pensionPaymentIn" className="font-semibold">
              Indbetaling
            </label>
            <CurrencyInput
              data-test-id-input="inputPaymentIn"
              id="pensionPayment"
              name="pensionPayment"
              defaultValue={user?.pensionPayment || 0}
              key={`pensionPayment:${user?.pensionPayment}`}
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
            {validationErrors.find(
              (error) => error.key === "pensionPayment"
            ) ? (
              <div data-test-id="inputPaymentInError" className="relative">
                {ErrorField(
                  validationErrors.find(
                    (error) => error.key === "pensionPayment"
                  )
                )}
              </div>
            ) : (
              <>
                <div
                  data-test-id="pensionPaymentInText"
                  className={!leftFieldInFocus ? "mx-3 font-bold" : "mx-3"}
                >
                  {pensionPayment()} kr. før skat
                </div>
                {!leftFieldInFocus ? (
                  <LockClosedIcon
                    data-test-id="lockClosedPaymentIn"
                    className="mx-auto h-[22px] stroke-[#000000] stroke-2"
                  />
                ) : (
                  <LockOpenIcon
                    data-test-id="lockOpenPaymentIn"
                    className="mx-auto h-[22px] stroke-[#BEC1CA] stroke-2"
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-[71px]">
          <PensionDiagram />
        </div>
        {loading ? (
          <div className="my-auto w-[107px]">
            <BeatLoader color="#4C7762"></BeatLoader>
          </div>
        ) : (
          <div className="w-[107px]">
            <div className="space-y-5">
              <ArrowLongUpIcon
                data-test-id="arrowUp"
                className="mx-auto h-[25px]"
              />
              <label data-test-id="pensionPaymentOut" className="font-semibold">
                Udbetaling
              </label>
              <CurrencyInput
                groupSeparator="."
                decimalSeparator=","
                value={pensionPaymentOut()}
                className={
                  rightFieldInFocus
                    ? "w-[107px] rounded-full border py-2 text-center"
                    : "w-[107px] rounded-full border py-2 text-center font-bold"
                }
                placeholder="pr. måned"
                onClick={() => setRightFieldInFocus(true)}
                onBlur={() => setRightFieldInFocus(false)}
                disabled={true}
              />
              <div
                data-test-id="pensionPaymentOutText"
                className={!rightFieldInFocus ? "mx-3 font-bold" : "mx-3"}
              >
                {numberWithCommas(pensionPaymentOut())} kr. før skat
              </div>
              {!rightFieldInFocus ? (
                <LockClosedIcon
                  data-test-id="lockClosedPaymentOut"
                  className="mx-auto h-[22px] stroke-[#000000] stroke-2"
                />
              ) : (
                <LockOpenIcon
                  data-test-id="lockOpenPaymentOut"
                  className="mx-auto h-[22px] stroke-[#BEC1CA] stroke-2"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PensionOverview;

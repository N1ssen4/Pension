import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { db } from "../../utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";

const PensionButton = () => {
  //Initialize context 
  const { user, dataIsValid } = useContext(UserContext);
  //Setup for firebase 
  const usercollection = collection(db, "users");
  //Add a user to Firebase000
  const createUser = async () => {
    await addDoc(usercollection, user);
  };
  //Making sure that the user cannot input a pensionpayment that is more that 80 percent of their salary.
  const PensionPaymentCheck = () => {
    const salarylimit = user.salary != null ? user.salary * 0.8 : 0;
    return user.pensionPayment != null
      ? user.pensionPayment > salarylimit
      : false;
  };
  //Checking that the users age is not greater that the wanted pension age. 
  const PensionAgeCheck = () => {
    const age = user.age != null ? user.age : 0;
    return user.wantedPensionAge != null ? user.wantedPensionAge < age : false;
  };


  return (
    <>
      {PensionPaymentCheck() ? (
        <div className="flex justify-center text-center text-red-500">
          <p>
            Det er ikke muligt at indbetale mere end 80% af sin løn til pension.
            Check venligst dine oplysninger igen.
          </p>
        </div>
      ) : PensionAgeCheck() ? (
        <div className="flex justify-center text-center text-red-500">
          <p>
            Det er ikke muligt at sætte din ønsket pensionalder lavere end din
            alder. Check venligst dine oplysninger igen.
          </p>
        </div>
      ) : (
        <div>
          <Link href={"/calendly"}>
            <button
              disabled={!dataIsValid(user)}
              className={
                !dataIsValid(user)
                  ? "h-[40px] w-[178px] rounded-[25px] border bg-[#a4a4d6] p-2 text-white"
                  : "h-[40px] w-[178px] rounded-[25px] border bg-[#0700F7] p-2 text-white"
              }
            >
              Book et møde
            </button>
          </Link>
          <div className="flex justify-center text-[14px] text-[#8E9197] ">
            Eller prøv{" "}
            <a href={"https://www.dreamplan.io/"} target="__blank">
              <div className="ml-1 underline">Dreamplan</div>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default PensionButton;

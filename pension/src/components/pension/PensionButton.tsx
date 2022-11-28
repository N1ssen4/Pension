import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";

const PensionButton = () => {
  const { contextUser } = useContext(UserContext);
  const usercollection = collection(db, "users");

  //making sure that the data is filles out
  const checkUserData = () => {
    if (
      contextUser.name !== "" &&
      contextUser.age !== null &&
      contextUser.salary !== null &&
      contextUser.pensionSaving !== null &&
      contextUser.pensionPayment !== null &&
      contextUser.publicPensionAge !== null &&
      contextUser.wantedPensionAge !== null
    ) {return false}
      return true;
  }

  const createUser = async () => {
    await addDoc(usercollection, {
      name: contextUser.name,
      age: Number(contextUser.age),
      salary: Number(contextUser.salary),
      pensionSaving: Number(contextUser.pensionSaving),
      pensionPayment: Number(contextUser.pensionPayment),
      publicPensionAge: Number(contextUser.publicPensionAge),
      wantedPensionAge: Number(contextUser.wantedPensionAge),
    });
  };
  return (
    <>
      <div>
        <button
          disabled={checkUserData()}
          onClick={createUser}
          className="h-[40px] w-[178px] rounded-[25px] border bg-[#0700F7] p-2 text-white"
        >
          Gem ændringer
        </button>
        {checkUserData() ? <div>Udfyld alle data</div> : null}
      </div>
    </>
  );
};

export default PensionButton;

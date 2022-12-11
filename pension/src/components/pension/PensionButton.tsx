import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { db } from "../../utils/database/trpc-server";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { PensionPaymentCheck } from "../../utils/pensionPaymentCheck";
import { PensionAgeCheck } from "../../utils/PensionAgeCheck";
import { validationSchema } from "../../utils/inputvalidation";

const PensionButton = () => {
  //Initialize context 
  const { user, dataIsValid } = useContext(UserContext);
  //Setup for firebase 
  const usercollection = collection(db, "users");
  //Add a user to Firebase
  const createUser = async () => {
    const firestoreUser = await addDoc(usercollection, user);
    localStorage.setItem("FirestoreID", firestoreUser.id);
  };
  const updateUser = async (id: string) => {
    const userDoc = doc(db, "users",id);
    await updateDoc(userDoc, user)
  }
  //Check the userData and then adding it to Firebase if correct. 
  const CheckUserDataAndAddToFirestore = () => {
    const userDataScheck = validationSchema.safeParse(user)
    if (userDataScheck.success){
      if (localStorage.getItem("FirestoreID") !== undefined || null) {
        const LocalStorageid = localStorage.getItem("FirestoreID") ?? ""
        updateUser(LocalStorageid)
      } else
      createUser()
    }
    else {
      console.log("ERROR: Not following Dreamplans dataskeleton")
    }
  }


  return (
    <>
      {PensionPaymentCheck(user.salary, user.pensionPayment) ? (
        <div className="flex justify-center text-center text-red-500">
          <p>
            Det er ikke muligt at indbetale mere end 80% af sin løn til pension.
            Check venligst dine oplysninger igen.
          </p>
        </div>
      ) : PensionAgeCheck(user.age, user.wantedPensionAge) ? (
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
              onClick={CheckUserDataAndAddToFirestore}
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

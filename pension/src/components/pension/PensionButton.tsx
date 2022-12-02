import React, { useContext, useState } from "react";
import { UserContext } from "../../context";
import { db } from "../../utils/firebase-config";
import { addDoc, collection } from "firebase/firestore";

const PensionButton = () => {
  const { user, dataIsValid } = useContext(UserContext);
  const usercollection = collection(db, "users");

  const createUser = async () => {
    await addDoc(usercollection, user);
  };
  return (
    <>
      <div>
        <button
          disabled={!dataIsValid(user)}
          onClick={createUser}
          className={
            !dataIsValid(user)
              ? "h-[40px] w-[178px] rounded-[25px] border bg-[#a4a4d6] p-2 text-white"
              : "h-[40px] w-[178px] rounded-[25px] border bg-[#0700F7] p-2 text-white"
          }
        >
          Gem ændringer
        </button>
      </div>
    </>
  );
};

export default PensionButton;

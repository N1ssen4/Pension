import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { User } from "../../types/User";

const CalculateButton = () => {
  const { contextUser, setContextUser } = useContext(UserContext);
  const isUserFilled = () => {
    if (
      (contextUser?.name,
      contextUser?.age,
      contextUser?.salary,
      contextUser?.pensionSaving,
      contextUser?.pensionPayment == null)
    ) {
      return true;
    } else false;
  };
  return (
    <>
      <div className="flex justify-center">
        <Link href={"/pension"}>
          <button
            disabled={isUserFilled()}
            onClick={() => console.log(contextUser)}
            className="h-[40px] w-[114px] rounded-[25px] border bg-[#0700F7] text-white"
          >
            Beregn
          </button>
        </Link>
      </div>
    </>
  );
};

export default CalculateButton;

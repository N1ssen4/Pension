import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const PensionInputAge = () => {
  const { contextUser, setContextUser } = useContext(UserContext);
  const [fieldWasUpdated, setFieldWasUpdated] = useState(false);

  const birthYear = () => {
    const age = contextUser?.age;
    const today = new Date();
    const year = today.getFullYear();
    return year - age;
  };
  const publicPensionYear = () => {
    return birthYear() + pensionAge() 
  }
  const wantedPensionAge = () => {
    return birthYear() + Number(contextUser?.wantedPensionAge)
  }

  const pensionAge = () => {
    if (birthYear() <= 1954) {
      return 66;
    } else if (birthYear() <= 1955) {
      return 67;
    } else if (birthYear() < 1962) {
      return 68;
    } else if (birthYear() < 1966) {
      return 69;
    } else if (birthYear() < 1970) {
      return 70;
    } else if (birthYear() < 1974) {
      return 71;
    } else return 72;
  };

  const updateWantedPensionAge = (e: any) => {
    const wantedPensionAge = "wantedPensionAge";
    const value = e.target.value;
    setContextUser((prev: any) => {
      return { ...prev, [wantedPensionAge]: value };
    });
    setFieldWasUpdated(true);
  };

  const setPublicPensionAge = () => {
    const publicPensionAge = "publicPensionAge";
    const value = (
      document.getElementById("publicPensionAge") as HTMLInputElement
    ).value;
    setContextUser((prev: any) => {
      return { ...prev, [publicPensionAge]: value };
    });
  };
  if (fieldWasUpdated) {
    localStorage.setItem("User", JSON.stringify(contextUser));
  }
  useEffect(() => {
    setPublicPensionAge();
  },[]);

  return (
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
        <p className="font-normal text-[#8E9197]">{publicPensionYear()}</p>
      </div>
      <div>
        <label className="mx-6 flex">Ønsket Pensionsalder</label>
        <input
          id="wantedPensionAge"
          name="wantedPensionAge"
          className="w-[145px] rounded-full border py-2 text-center font-normal focus:font-bold"
          type="number"
          placeholder="Antal år"
          onBlur={updateWantedPensionAge}
          defaultValue={contextUser?.wantedPensionAge}
        />
        <p className="font-normal text-[#8E9197]">
          {fieldWasUpdated ? wantedPensionAge() : "YYYY"}
        </p>
      </div>
    </div>
  );
};

export default PensionInputAge;

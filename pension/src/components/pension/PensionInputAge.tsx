import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";

const PensionInputAge = () => {
  const { setField, user } = useContext(UserContext);

  const birthYear = () => {
    const age =
    user.age !== null ? user.age : 0
    const today = new Date();
    const year = today.getFullYear();
    return year - age;
  };
  const publicPensionYear = () => {
    return birthYear() + pensionAge();
  };
  const wantedPensionAge = () => {
    if (user?.wantedPensionAge != null)
      return birthYear() + Number(user?.wantedPensionAge);
    else return "YYYY";
  };

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

  const setPublicPensionAge = () => {
    const value = (
      document.getElementById("publicPensionAge") as HTMLInputElement
    ).value;
    setField("publicPensionAge", value);
  };

  const updatePensionAge = (e: any) => {
    const value = e.target.value;
    setField("wantedPensionAge", value);
  };

  return (
    <div className="flex justify-between text-center font-semibold">
      <div>
        <label className="mx-6 flex">Folkepensions-alder</label>
        <input
          onLoad={setPublicPensionAge}
          id="publicPensionAge"
          name="publicPensionAge"
          className="w-[145px] rounded-full border py-2 text-center font-bold"
          type="number"
          placeholder="Antal år"
          disabled={true}
          defaultValue={pensionAge()}
        />
        <div className="font-normal text-[#8E9197]">{publicPensionYear()}</div>
      </div>
      <div>
        <label className="mx-6 flex">Ønsket Pensionsalder</label>
        <input
          name="wantedPensionAge"
          className="w-[145px] rounded-full border py-2 text-center font-normal focus:font-bold"
          type="number"
          placeholder="Antal år"
          onBlur={updatePensionAge}
          onChange={updatePensionAge}
          defaultValue={user?.wantedPensionAge || 0}
        />
        <div className="font-normal text-[#8E9197]">{wantedPensionAge()}</div>
      </div>
    </div>
  );
};

export default PensionInputAge;

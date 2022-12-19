import { NextPage } from "next";
import { useEffect } from "react";
import { getPensionInfo } from "../services/pension.service";

export const Pensure: NextPage = () => {

const pensureID = localStorage.getItem("pensureID");
if (pensureID) {
  getPensionInfo(pensureID);
}
  return (
    <>
      <div>Pensure Page</div>
    </>
  );
};

export default Pensure;

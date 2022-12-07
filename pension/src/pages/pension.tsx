import { NextPage } from "next";
import { Suspense } from "react";
import NavBar from "../components/navigation/NavBar";
import PensionBottom from "../components/pension/PensionBottom";
import PensionInputAge from "../components/pension/PensionInputAge";
import PensionIntroduction from "../components/pension/PensionIntroduction";
import PensionOverview from "../components/pension/PensionOverview";

export const Pension: NextPage = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <main className="grid place-content-center p-4 pt-1">
        <div className="min-h-[80vh] max-w-[375px] space-y-5 rounded-2xl border p-5 shadow-xl">
          <PensionIntroduction />
          <PensionInputAge />
          <PensionOverview />
          <PensionBottom />
        </div>
      </main>
    </>
  );
};

export default Pension;

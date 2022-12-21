import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { InfoModal } from "../home/InfoModal";

const PensionIntroduction = () => {
  return (
    <>
      <div className="mx-12 space-y-5 ">
        <div
          data-test-id="pensionPageTitle"
          className="mx-8 flex justify-center text-[20px] font-semibold"
        >
          Pension
        </div>

        <div data-test-id="pensionPageText" className="text-center">
          Her kan du se konsekvenserne af at ændre din pensionsalder:
        </div>
      </div>
    </>
  );
};

export default PensionIntroduction;

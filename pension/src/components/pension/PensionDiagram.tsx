import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";


const PensionDiagram = () => {
  const {contextUser} = useContext(UserContext)
  const pensionPaymentPercent = contextUser?.pensionPayment / contextUser?.salary
  
  return (
    <div className="flex justify-between">
      <div>
        <div className="relative h-[236px] w-[29px] border border-[#BEC1CA]">
          <div
            style={{ height: pensionPaymentPercent * 236 }}
            className={`absolute inset-x-0 bottom-0 max-h-[236px] w-[27px] bg-gradient-to-b from-[#514DF9] to-[#E3E2FF] transition-[height]`}
          ></div>
        </div>
      </div>
      <div>
        <div className="relative h-[236px] w-[29px] border border-[#BEC1CA]">
          <div
            style={{ height: pensionPaymentPercent }}
            className={`transition-[height] absolute inset-x-0 bottom-0 h-[100px] max-h-[236px] w-[27px] bg-gradient-to-b from-[#4C7762] to-[#7FC6A4]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PensionDiagram;

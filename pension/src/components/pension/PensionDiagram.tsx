import React, { useContext, useMemo } from "react";
import { UserContext } from "../../context";

const PensionDiagram = () => {
  const { user } = useContext(UserContext);
  
  const pensionPaymentPercent = useMemo(() => {
    const divHeight =
    user?.pensionPayment && user?.salary != null
      ? user?.pensionPayment / user?.salary
      : 0;
      return divHeight
  }, [user]);

  

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
            className={`absolute inset-x-0 bottom-0 h-[100px] max-h-[236px] w-[27px] bg-gradient-to-b from-[#4C7762] to-[#7FC6A4] transition-[height]`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PensionDiagram;

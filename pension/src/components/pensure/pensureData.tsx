import Link from "next/link";
import { useEffect } from "react";
import { getPensionInfo } from "../../services/pension.service";


const PensureData = () => {
    
    useEffect(() => {
      const pensureID = localStorage.getItem("pensureID");
      if (pensureID) {
        getPensionInfo(pensureID);
      }
    }, []);


  return (
    <>
      <div className="space-y-6">
        <div className="w-[300px] space-y-3 rounded-t-2xl rounded-br-2xl border p-5 shadow">
          <div>Samlet pensionsindsamling:</div>
          <div className="font-bold">[XXXX kr.]</div>
          <div className="flex justify-start">
            
          </div>
        </div>
        <div className="w-[300px] space-y-3 rounded-t-2xl rounded-br-2xl border p-5 shadow">
          Har vi fundet de rigtige oplysninger? Tjek de fundne oplysninger og
          ret dem eventuelt til.
        </div>
        <div className="flex justify-center">
          <Link href={"/"}>
            <button className="h-[40px] w-[114px] rounded-[25px] border bg-[#0700F7] text-white">
              Gå tilbage
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PensureData;

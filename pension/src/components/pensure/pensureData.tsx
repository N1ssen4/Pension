import { divide } from "cypress/types/lodash";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPensionInfo } from "../../services/pension.service";

const PensureData = () => {
  const [pensionInfo, setPensionInfo] = useState<DocumentData | undefined>();

  useEffect(() => {
    const ID = localStorage.getItem("pensureID");
    if (ID) {
      // Wait for the Promise to resolve before calling setPensionInfo
      (async () => {
        const data = await getPensionInfo(ID);
        setPensionInfo(data);
      })();
    }
  }, []);

  return (
    <>
      <div className="space-y-6">
        <div className="w-[300px] space-y-3 rounded-t-2xl rounded-br-2xl border p-5 shadow">
          <div>Samlet pensionsindsamling:</div>
          <div className="font-bold">
            {pensionInfo ? (
              <>
                <div>Indbetaling: {pensionInfo.Payment}</div>
                <div>
                  Pensionsforening: {pensionInfo.PensionProviderName}
                </div>
                <div>Pensionsopsparing: {pensionInfo.SavedValue}</div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div className="flex justify-start"></div>
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

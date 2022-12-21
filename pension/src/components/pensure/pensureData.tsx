import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { getPensionInfo } from "../../services/pension.service";
import { numberWithCommas } from "../../utils/numberformatter";

const PensureData = () => {
  const { user, setField } = useContext(UserContext);
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

  const setPensionContext = (type: string, callback?: () => void) => {
    let total = 0;
    if (pensionInfo) {
      Object.values(pensionInfo).forEach((data) => {
        if (type === "pensionPayment") {
          total += data.Payment;
        } else if (type === "pensionSaving") {
          total += data.SavedValue;
        }
      });
    }
    setField(type, total);
    if (callback) {
      callback();
    }
  };
  return (
    <>
      <div className="space-y-6">
        <div className="w-[300px] space-y-3 rounded-t-2xl rounded-br-2xl border p-5 shadow">
          <div>Samlet pensionsindsamling:</div>
          <div className="space-y-3">
            {pensionInfo ? (
              // Use the reduce method to create an object with the PensionProviderName as the key and the Payment and SavedValue values as the value
              Object.entries(
                Object.values(pensionInfo).reduce((result, data) => {
                  if (!result[data.PensionProviderName]) {
                    result[data.PensionProviderName] = {
                      Payment: 0,
                      SavedValue: 0,
                    };
                  }
                  result[data.PensionProviderName].Payment += data.Payment;
                  result[data.PensionProviderName].SavedValue +=
                    data.SavedValue;
                  return result;
                }, {})
              ).map(([key, data]: any) => (
                <>
                  <div className="font-bold">{key}</div>
                  <div>Indbetaling: {numberWithCommas(data.Payment)} kr.</div>
                  <div>
                    Pensionsopsparing: {numberWithCommas(data.SavedValue)} kr.
                  </div>
                </>
              ))
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
            <button
              onClick={() => {
                setPensionContext("pensionPayment", () => {
                  setTimeout(() => {
                    setPensionContext("pensionSaving");
                  }, 1);
                });
              }}
              className="h-[40px] w-[114px] rounded-[25px] border bg-[#0700F7] text-white"
            >
              Gå tilbage
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PensureData;

import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import { getPensionInfo } from "../../services/pension.service";
import { numberWithCommas } from "../../utils/numberformatter";

const PensureData = () => {
  const { setFields } = useContext(UserContext);
  const [pensionInfo, setPensionInfo] = useState<DocumentData | undefined>();

  //Fetching the pensiondata from Pensure.
  useEffect(() => {
    const ID = localStorage.getItem("pensureID");
    if (ID) {
      // Waiting for the Promise to resolve before calling setPensionInfo.
      (async () => {
        const data = await getPensionInfo(ID);
        setPensionInfo(data);
      })();
    }
  }, []);

  //Setting the pensionPayment & -Saving on the userContext.
  useEffect(() => {
    if (pensionInfo) {
      let pensionPayment = 0;
      let pensionSaving = 0;

      Object.values(pensionInfo).forEach((data) => {
        pensionPayment += data.Payment;
        pensionSaving += data.SavedValue;
      });
      setFields(["pensionPayment", "pensionSaving"], [pensionPayment, pensionSaving]);
    }
    
  }, [pensionInfo]);

  return (
    <>
      <div className="space-y-6">
        <div className="w-[300px] space-y-3 rounded-t-2xl rounded-br-2xl border p-5 shadow">
          <div>Samlet pensionsindsamling:</div>
          <div className="space-y-3">
            {pensionInfo ? (
              Object.entries(
                //Getting the pensionProviderName as a key and Payment & SavedValue as values. Then adding all the payments and savedvalues and assigning them to the key.
                //This is because some users have mutiple entires of the same PensionProviderName with different payments and savings which could be confusing to some users.
                //So here we have grouped those into single PensionProviderName "keys" with the corresponding "values": Payment & SavedValue.
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
          Har vi fundet de rigtige oplysninger? Du kan rette dine oplysninger på
          næste side hvis der er eventuelle fejl.
        </div>
        <div className="flex justify-center">
          <Link href={"/"}>
            <button className="h-[40px] w-[114px] rounded-[25px] border bg-[#0700F7] text-white">
              Gå videre
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PensureData;

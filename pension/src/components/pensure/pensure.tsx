import { useRouter } from "next/router";
import { useMemo } from "react";

export const PensureLinkButton = ({forwardurl} : {forwardurl: string}) => {
  const router = useRouter()  
  const pensureRedirectUrl = useMemo(() => {
    if (typeof window !== "undefined")
    {
      let webhookUrl = "/api/webhook/pensure";
      if (webhookUrl?.slice(0, 4) !== "http") {
        webhookUrl = `${window.location.origin}/${webhookUrl}`;
      }

      const userId = localStorage.getItem("pensureID");
      const url = new URL(`https://dreamplan.demo.pensure.dk/zeus1`);

      if (userId) {
        url.searchParams.set("l", userId);
        url.searchParams.set("demo-webhookurl", webhookUrl);
        url.searchParams.set(
          "demo-forwardurl",
          `${window.location.origin}/${forwardurl}`
        );
        return url.toString();
      }
    }
    return ''
  }, [forwardurl])

  const onClick = () => {
    router.push(pensureRedirectUrl);
  }
  
  return (
    <>
      <div className="text-center">
        Hent automatisk din pensionsdata ved at benytte vores samarbejdspartner Pensure: 
      </div>
      <div className="flex justify-center">
        <button
          className="h-[30px] w-[100px] rounded-[25px] border bg-[#0700F7] text-white"
          onClick={onClick}
        >
          Pensure
        </button>
      </div>
    </>
  );
};

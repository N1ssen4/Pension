import { useRouter } from "next/router";
import { useMemo } from "react";

export const PensureLinkButton = ({forwardurl} : {forwardurl: string}) => {
  const router = useRouter()  
  const pensureRedirectUrl = useMemo(() => {
    if (typeof window !== "undefined")
    {
      let webhookUrl = "/webhook/pensure";
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
    <button onClick={onClick}>
      Hent dine pensionsoplysninger fra Pensure her
    </button>
  );
};

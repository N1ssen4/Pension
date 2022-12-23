import { useRouter } from "next/router";
import { useMemo } from "react";

const PensureLinkButton = ({ forwardurl }: { forwardurl: string }) => {
  const router = useRouter();
  //Defining the redirectURL for pensure, so it knows where to send the user after completing their flow.

  const pensureRedirectUrl = useMemo(() => {
    //Checking that the window is not undefined so we can access the localstorage.
    if (typeof window !== "undefined") {
      //setting our webhookURL.
      let webhookUrl = "/api/webhook/pensure";
      //checking that the url is fully qualified.
      if (webhookUrl?.slice(0, 4) !== "http") {
        webhookUrl = `${window.location.origin}/${webhookUrl}`;
      }
      //getting our uuid for Pensure.
      const userId = localStorage.getItem("pensureID");
      //Creating a URL object with our pensure link.
      const url = new URL(`https://dreamplan.demo.pensure.dk/zeus1`);

      //If we have a userId then set these queryparams.
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
    return "";
  }, [forwardurl]);

  //Setting onclick to botton
  const onClick = () => {
    router.push(pensureRedirectUrl);
  };

  return (
    <>
      <div data-test-id="pensureButtonWrapper" className="text-center ">
        <div data-test-id="pensureTitle">
          Hent automatisk din pensionsdata ved at benytte vores
          samarbejdspartner
        </div>
        <div>
          <a
            className="cursor-pointer bg-gradient-to-r from-[#FEB791] to-[#F57A83] bg-clip-text text-transparent"
            onClick={onClick}
          >
            <button data-test-id="pensureButton" className="rounded-md bg-gradient-to-r from-[#FEB791] to-[#F57A83] px-3 py-1 font-semibold text-white">
              Pensure
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default PensureLinkButton;

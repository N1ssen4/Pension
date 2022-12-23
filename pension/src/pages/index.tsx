import { type NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import CalculateButton from "../components/home/CalculateButton";
import { InputProps } from "../components/home/Input";
import InputMapper from "../components/home/InputMapper";
import Introduction from "../components/home/Introduction";
import PensureLinkButton from "../components/pensure/pensure";


//HomePage. Here I initialize the inputs and the userdata.
const Home: NextPage = () => {
  const fielddata: InputProps[] = useMemo(() => {
    const user =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("User") || "{}")
        : null;
    return [
      {
        name: "name",
        type: "text",
        placeholder: "Jens Jensen",
        labelname: "Navn",
        defaultValue: user?.name || "",
      },
      {
        name: "birthYear",
        type: "number",
        placeholder: "1967",
        labelname: "Fødselsår",
        defaultValue: user?.birthYear || "",
      },
      {
        name: "salary",
        type: "currency",
        placeholder: "30.000",
        labelname: "Månedsløn før skat",
        defaultValue: user?.salary || "",
      },
      {
        name: "pensionSaving",
        type: "currency",
        placeholder: "500.000",
        labelname: "Samlet pensionsopsparing i dag",
        defaultValue: user?.pensionSaving || "",
      },
      {
        name: "pensionPayment",
        type: "currency",
        placeholder: "5.000",
        labelname: "Månedlig pensionsindbetaling",
        defaultValue: user?.pensionPayment || "",
      },
    ];
  }, []);
  return (
    <>
      <Head>
        <title>Dreamplans pensionsapp</title>
        <meta name="Pension App" content="Dreamplans pensionsapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid place-content-center p-4">
        <div className="min-h-[80vh] max-w-[375px] space-y-3 rounded-2xl border p-5 shadow-xl">
          <Introduction />
          <PensureLinkButton forwardurl={"/pensure"} />
          <InputMapper data={fielddata} />
          <CalculateButton />
        </div>
      </main>
    </>
  );
};

export default Home;

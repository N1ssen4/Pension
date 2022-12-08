import { type NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import CalculateButton from "../components/home/CalculateButton";
import { InputProps } from "../components/home/Input";
import InputMapper from "../components/home/InputMapper";
import Introduction from "../components/home/Introduction";

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
        placeholder: "Indtast navn",
        labelname: "Navn",
        defaultValue: user?.name || "",
      },
      {
        name: "age",
        type: "number",
        placeholder: "Indtast år",
        labelname: "Alder",
        defaultValue: user?.age || "",
      },
      {
        name: "salary",
        type: "currency",
        placeholder: "Indtast kr",
        labelname: "Løn før skat pr. måned",
        defaultValue: user?.salary || "",
      },
      {
        name: "pensionSaving",
        type: "currency",
        placeholder: "Indtast kr",
        labelname: "Samlet pensionsopsparing",
        defaultValue: user?.pensionSaving || "",
      },
      {
        name: "pensionPayment",
        type: "currency",
        placeholder: "Indtast kr",
        labelname: "Pensionsindbetaling pr. måned",
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
        <div className="min-h-[80vh] max-w-[375px] rounded-2xl border p-5 shadow-xl space-y-3">
          <Introduction />
          <InputMapper data={fielddata} />
          <CalculateButton />
        </div>
      </main>
    </>
  );
};

export default Home;

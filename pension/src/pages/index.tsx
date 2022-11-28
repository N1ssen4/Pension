import { type NextPage } from "next";
import Head from "next/head";
import { parse } from "path";
import { useEffect, useState } from "react";
import CalculateButton from "../components/home/CalculateButton";
import { InputProps } from "../components/home/Input";
import InputMapper from "../components/home/InputMapper";
import Introduction from "../components/home/Introduction";
import { User } from "../types/User";

const Home: NextPage = () => {
  
    const [LSUser, setLSUser] = useState<User>({
      name: "",
      age: null,
      salary: null,
      pensionSaving: null,
      pensionPayment: null,
      publicPensionAge: null,
      wantedPensionAge: null,
    });

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("User") || "{}");
      setLSUser(user);
      console.log("Local storage user: " + LSUser);
    }, []);
    
    
  
  const fielddata: InputProps[] = [
    {
      name: "name",
      type: "text",
      placeholder: "navn",
      labelname: "Navn",
      defaultValue: LSUser?.name,
    },
    {
      name: "age",
      type: "number",
      placeholder: "år",
      labelname: "Alder",
      defaultValue: LSUser?.age,
    },
    {
      name: "salary",
      type: "currency",
      placeholder: "kr.",
      labelname: "Løn før skat pr. måned",
      defaultValue: LSUser?.salary,
    },
    {
      name: "pensionSaving",
      type: "currency",
      placeholder: "kr.",
      labelname: "Samlet pensionsopsparing",
      defaultValue: LSUser?.pensionSaving,
    },
    {
      name: "pensionPayment",
      type: "currency",
      placeholder: "kr.",
      labelname: "Pensionsindbetaling pr. måned",
      defaultValue: LSUser?.pensionPayment,
    },
  ];

  return (
    <>
      <Head>
        <title>Dreamplans pensionsapp</title>
        <meta name="Pension App" content="Dreamplans pensionsapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid place-content-center p-4">
        <div className="min-h-[80vh] max-w-[375px] rounded-2xl border p-5 shadow-xl">
          <Introduction />
          <InputMapper data={fielddata} />
          <CalculateButton />
        </div>
      </main>
    </>
  );
};

export default Home;

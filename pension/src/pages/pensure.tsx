import { NextPage } from "next";
import { client } from "./api/webhook/pensure";

export const Pensure: NextPage = () => {

  console.log(client.get("pensureData"))
  return (
    <>
      <div>Pensure Page</div>
    </>
  );
};

export default Pensure;

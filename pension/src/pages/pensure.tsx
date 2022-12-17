import { NextPage } from "next";

export const Pensure: NextPage = () => {

  async function getPensureData() {
    const reposonse = await fetch("/api/webhook/pensure");
    const data = await reposonse.json();

    console.log(data)
  }
  getPensureData()
  return (
    <>
      <div>Pensure Page</div>
    </>
  );
};

export default Pensure;

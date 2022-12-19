import { NextPage } from "next";
import PensureData from "../components/pensure/pensureData";
export const Pensure: NextPage = () => {


  return (
    <main className="grid place-content-center p-4">
      <div className="min-h-[80vh] max-w-[375px] space-y-3 border p-5 shadow-xl">
        <PensureData/>
      </div>
    </main>
  );
};

export default Pensure;

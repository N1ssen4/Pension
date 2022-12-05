import Link from "next/link";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context";

const CalculateButton = () => {
  const {dataIsValid, user} = useContext(UserContext)
  

  return (
    <>
      <div className="flex justify-center">
        <Link href={"/pension"}>
          <button
            disabled={!dataIsValid(user)}
            className={
              !dataIsValid(user)
                ? "h-[40px] w-[114px] rounded-[25px] border bg-[#a4a4d6] text-white"
                : "h-[40px] w-[114px] rounded-[25px] border bg-[#0700F7] text-white"
            }
          >
            Beregn
          </button>
        </Link>
      </div>
    </>
  );
};

export default CalculateButton;

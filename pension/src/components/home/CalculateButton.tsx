import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../context";
import { PensionPaymentCheck } from "../../utils/pensionPaymentCheck";

const CalculateButton = () => {
  //Initialize the context
  const { dataIsValid, user } = useContext(UserContext);

  return (
    <>
      {PensionPaymentCheck(user.salary,user.pensionPayment) ? (
        <div className="flex justify-center text-center text-red-500">
          <p>Det er ikke muligt at indbetale mere end 80% af sin løn til pension. Check venligst dine oplysningerne igen. </p>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default CalculateButton;

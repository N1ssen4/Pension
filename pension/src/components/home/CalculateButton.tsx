import Link from "next/link";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context";

const CalculateButton = () => {
  //Initialize the context
  const { dataIsValid, user } = useContext(UserContext);
  //Checking that the user is not paying more than 80 percent of their salary to pension. 
  const PensionPaymentCheck = () => {
    const salarylimit = user.salary != null ? user.salary * 0.8 : 0;
    return user.pensionPayment != null
      ? user.pensionPayment > salarylimit
      : false;
  };

  return (
    <>
      {PensionPaymentCheck() ? (
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

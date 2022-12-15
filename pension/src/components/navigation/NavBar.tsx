import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DreamplanLogo from "./DreamplanLogo";


//Navbar with the logo and users name. 
const NavBar = ({username}:{username: string}) => {
  //Initialize the context
  return (
    <div className="flex h-[64px] items-center justify-between p-6 shadow-md">
      <div>
        <Link href={"/"}>
          <button data-test-id="DPlogoButton">
            <DreamplanLogo />
          </button>
        </Link>
      </div>
      <div className="flex space-x-2 ">
        <div data-test-id="username" className="font-semibold">
          {username}
        </div>
        <div data-test-id="userLogo">
          <UserCircleIcon className="h-[25px] w-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

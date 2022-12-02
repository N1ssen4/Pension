import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../../context";
import DreamplanLogo from "./DreamplanLogo";

const NavBar = () => {
  const {user} = useContext(UserContext);

  return (
    <div className="flex h-[64px] items-center justify-between p-6 shadow-md">
      <div>
        <Link href={"/"}>
          <button>
            <DreamplanLogo />
          </button>
        </Link>
      </div>
      <div className="flex space-x-2 ">
        <div className="font-semibold">{user?.name}</div>
        <div>
          <UserCircleIcon className="h-[25px] w-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

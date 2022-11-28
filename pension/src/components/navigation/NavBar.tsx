import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import DreamplanLogo from './DreamplanLogo';

const NavBar = () => {
    const {contextUser} = useContext(UserContext)

  return (
    <div className="flex h-[64px] items-center justify-between p-6 shadow-md">
      <div>
        <Link href={'/'}>
          <button>
            <DreamplanLogo />
          </button>
        </Link>
      </div>
      <div className="flex space-x-2 ">
        <p className="font-semibold">{contextUser?.name}</p>
        <div>
          <UserCircleIcon className="h-[25px] w-[25px]" />
        </div>
      </div>
    </div>
  );
}

export default NavBar
import React, { useContext, useMemo } from 'react'
import { UserContext } from '../../context'
import PensionButton from './PensionButton'

const PensionBottom = () => {
  //Initialize the context
 const {user} = useContext(UserContext)
  //Getting the coverage ratio in percent to display for the user. 
 const pensionCoverageRatioPercent = useMemo(()=> {
    const percent = 
      user?.coverageRatio != null ? Math.round(user.coverageRatio * 100) : ""
    return percent
 },[user])
  return (
    <div className="text-center">
      <div className="mx-28 -mt-2 font-semibold">Procent af din løn</div>
      <div className="m-8 mx-12">
        Din pensionsudbetaling er svarende til {pensionCoverageRatioPercent}% af
        din løn på pensionstidspunktet
      </div>
      <PensionButton />
    </div>
  );
}

export default PensionBottom
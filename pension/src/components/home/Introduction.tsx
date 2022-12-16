import React from 'react'

//Intro text. 
const Introduction = () => {
  return (
    <>
      <div
        data-test-id="pensionTitle"
        className="mx-8 text-center text-[20px] font-semibold"
      >
        Hvornår vil du gå på pension?
      </div>
      <div className='text-center text-[14px] font-thin'>
        Se hvad du skal spare op i dag for at kunne gå på pension det år du
        drømmer om.
      </div>
    </>
  );
}

export default Introduction
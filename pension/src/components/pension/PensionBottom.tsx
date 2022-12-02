import React from 'react'
import PensionButton from './PensionButton'

const PensionBottom = () => {
  return (
    <div className='text-center'>
        <div className='font-semibold -mt-2 mx-28'>Procent af din løn</div>
        <div className='m-8 mx-12'>Din pensionsudbetaling er svarende til [procenttal]% af din løn på pensionstidspunktet </div>
        <PensionButton/>
    </div>
  )
}

export default PensionBottom
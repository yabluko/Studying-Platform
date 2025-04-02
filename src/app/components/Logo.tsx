import React from 'react'
import Logo from '../../../public/icons/logo'

function LogoTemplate() {
  return (
    <div className='flex items-center gap-2'>
        <Logo/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-10 via-purple-20 to-purple-30 font-extrabold text-base">COURSUE</span>
    </div>
  )
}

export default LogoTemplate
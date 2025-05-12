import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import Image from 'next/image'
import picLogin from '../../../public/images/photo-login.webp'
import HeaderComponent from '../../components/Header/HeaderComponent'

function Login() {
  return (
    <div>
        <HeaderComponent/>
        <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden lg:block">
            <Image
                    src={picLogin}
                    alt='Picture of author'
                    fill
                    style={{
                        objectFit: 'cover',}}
                        />
        </div>
        <div className="flex">
            <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
                <LoginForm />
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login
import React from 'react'
import LoginContainer from './component/LoginContainer'
import BackgorundPage from './component/BackgroundPage'
import { Link } from 'react-router-dom'
import { useState } from 'react';

function Login() {
  return (
    <BackgorundPage>
      <LoginContainer>
        <LoginContent />
      </LoginContainer>
    </BackgorundPage>
  )
}

function LoginContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <div className="mb-4">
        <div className="text-center font-bold text-xl">
          Login
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input 
        onChange={(e)=>setEmail(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email" type="text" placeholder="Email" />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
        onChange={(e)=>setPassword(e.target.value)} 
        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none
                      focus:shadow-outline" id="password" type="password" placeholder="******************" />
      </div>
      <div className="flex flex-col items-center justify-between gap-5">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
                        focus:shadow-outline" type="button">
          Sign In
        </button>
        <Link to={"/register"} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
          Make an account?
        </Link>
      </div>
    </>
  )
}
  

export default Login
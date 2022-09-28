import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import logo from '../assets/logo.jpeg';
import 'jwt-decode'
import jwtDecode from 'jwt-decode';

import { client } from '../client';


const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const decoded = jwtDecode(response.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    const {name, picture, sub} =  decoded;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace: true})
    })

  }

  return (
    <div className='flex bg-[#374B73] justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0'>
          <div className='border-4 border-[#FF8197] rounded-lg'>
            <img src={logo} width='130px' alt='logo' />
          </div>

          <div className='shadow-2x1 p-2 hover:opacity-100 opacity-80'>
            <GoogleLogin
              buttonText = "Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={() => { console.log('error')}}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import registerImg from '../../assets/register.png'
import './RegisterPage.css'
import './RegisterPage.css'
import axios from 'axios'
import { toast } from '../..'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const [role, setRole] = useState('cashier');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    const toastId = toast.loading('Registering...');
    const name = document.getElementById('name-input').value
    const email = document.getElementById('email-input').value
    const password = document.getElementById('password-input').value
    axios.post(`/staff/`, {
      name: name,
      email: email,
      password: password,
      is_admin: role === 'admin'
    }).then((response) => {
      toast.success('Registration successful! Please Login', { id: toastId }, { duration: 5000 })
      navigate(`/`)
    }).catch((error) => {
      if (error?.response?.data?.error?.length > 0)
        toast.error(error.response.data.error, { id: toastId })
      else
        toast.error('An error occurred', { id: toastId })
    })
  }

  return (
    <div className='gradient-background flex justify-center items-center'>
      <div className="login-hero bg-white flex flex-row-reverse w-[63rem] min-w-[27rem] h-[34rem] rounded-[3rem] p-[2.1rem] gap-[2.1rem] shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] sm:!m-5 scale-[0.8] sm:!scale-[1]">
        <div className="login-art rounded-[2rem] h-full aspect-square justify-center items-center p-[1rem] hidden lg:flex">
          <img src={registerImg} className='drop-shadow-lg' alt="" />
        </div>
        <div className="login-main w-full flex flex-col items-center">
          <div className="font-['Smooch_Sans'] font-bold text-[6rem] mt-[0.4rem] leading-none">Register</div>
          <div className="text-sm leading-none mt-1">Just add details and we're set.</div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-auto mb-2' autoComplete='off'>

            <div className="flex w-full bg-[#3735C5] p-1 text-white rounded-2xl font-medium text-[14px]">
              <div className={`w-full text-center p-2 rounded-xl transition duration-200 ${role === 'cashier' ? 'bg-[white] text-black' : null}`} onClick={() => { setRole('cashier') }}>Cashier</div>
              <div className={`w-full text-center p-2 rounded-xl transition duration-200 ${role === 'admin' ? 'bg-[white] text-black' : null}`} onClick={() => { setRole('admin') }}>Admin</div>
            </div>

            <div className="flex bg-[#F2F2F2] gap-2.5 py-2.5 px-3 rounded-xl w-[20rem]">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 22.5H18.5V20.5C18.5 18.8431 17.1569 17.5 15.5 17.5H9.5C7.84315 17.5 6.5 18.8431 6.5 20.5V22.5H4.5V20.5C4.5 17.7386 6.73858 15.5 9.5 15.5H15.5C18.2614 15.5 20.5 17.7386 20.5 20.5V22.5ZM12.5 13.5C9.18629 13.5 6.5 10.8137 6.5 7.5C6.5 4.18629 9.18629 1.5 12.5 1.5C15.8137 1.5 18.5 4.18629 18.5 7.5C18.5 10.8137 15.8137 13.5 12.5 13.5ZM12.5 11.5C14.7091 11.5 16.5 9.70914 16.5 7.5C16.5 5.29086 14.7091 3.5 12.5 3.5C10.2909 3.5 8.5 5.29086 8.5 7.5C8.5 9.70914 10.2909 11.5 12.5 11.5Z" fill="#1C1C1C" /></svg>
              <input type="name" name="name" id="name-input" className='bg-[#F2F2F2] outline-none w-full text-[15px]' placeholder='Name' required></input>
            </div>
            <div className="flex bg-[#F2F2F2] gap-2.5 py-2.5 px-3 rounded-xl w-[20rem]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -8 71 84" width="25"><path fill="black" stroke="black" stroke-width="1.8" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path><path fill="black" stroke="black" stroke-width="1.8" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path><path fill="black" stroke="black" stroke-width="1.8" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path></svg>
              <input type="email" name="email" id="email-input" className='bg-[#F2F2F2] outline-none w-full text-[15px]' placeholder='Email' required></input>
            </div>
            <div className="flex bg-[#F2F2F2] gap-2.5 py-2.5 px-3 rounded-xl w-[20rem]">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 8.5V7.5C6.5 4.18629 9.18629 1.5 12.5 1.5C15.8137 1.5 18.5 4.18629 18.5 7.5V8.5H20.5C21.0523 8.5 21.5 8.94772 21.5 9.5V21.5C21.5 22.0523 21.0523 22.5 20.5 22.5H4.5C3.94772 22.5 3.5 22.0523 3.5 21.5V9.5C3.5 8.94772 3.94772 8.5 4.5 8.5H6.5ZM19.5 10.5H5.5V20.5H19.5V10.5ZM11.5 16.2324C10.9022 15.8866 10.5 15.2403 10.5 14.5C10.5 13.3954 11.3954 12.5 12.5 12.5C13.6046 12.5 14.5 13.3954 14.5 14.5C14.5 15.2403 14.0978 15.8866 13.5 16.2324V18.5H11.5V16.2324ZM8.5 8.5H16.5V7.5C16.5 5.29086 14.7091 3.5 12.5 3.5C10.2909 3.5 8.5 5.29086 8.5 7.5V8.5Z" fill="#1C1C1C" /></svg>
              <input type="password" name="password" id="password-input" className='bg-[#F2F2F2] outline-none w-full text-[15px]' placeholder='Password' required></input>
            </div>
            <button type="submit" className='bg-black text-white p-3.5 rounded-xl font-bold mt-1'>SIGN UP</button>
          </form>
          <span className='mt-2 mb-1'>Already have an account? <a href="/" className='font-medium text-black no-underline'>Login Instead</a></span>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
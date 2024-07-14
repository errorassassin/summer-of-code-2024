import React from 'react'
import cashierImg from '../../assets/cashier.png'
import './LoginPage.css'
import axios from 'axios'
import { toast } from '../..'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    const toastId = toast.loading('Logging in...');

    const email = document.getElementById('email-input').value
    const password = document.getElementById('password-input').value

    axios.get(`/staff/login`, {
      params: {
        email: email,
        password: password
      }
    }).then((response) => {
      if (response.data) {
        localStorage.setItem('token', response.data.token)
        toast.success('Login successful!', { id: toastId })
        const role = response.data.is_admin ? 'admin' : 'cashier';
        navigate(`/${role}`)
      }
      else
        toast.error('An error occurred', { id: toastId })
    }).catch((error) => {
      if (error?.response?.data?.error?.length > 0)
        toast.error(error.response.data.error, { id: toastId })
      else
        toast.error('An error occurred', { id: toastId })
    })
  }

  return (<>
    <div className='gradient-background flex justify-center items-center'>
      <div className="login-hero bg-white flex flex-row w-[63rem] min-w-[27rem] h-[34rem] rounded-[3rem] p-[2.1rem] gap-[2.1rem] shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] sm:!m-5 scale-[0.8] sm:!scale-[1]">
        <div className="login-art rounded-[2rem] h-full aspect-square justify-center items-center p-3 hidden lg:flex">
          <img src={cashierImg} className='drop-shadow-lg' alt="Cashier Illustration" />
        </div>
        <div className="login-main w-full flex flex-col items-center">
          <div className="font-['Smooch_Sans'] font-bold text-[6rem] mt-[1.5rem] leading-none">Welcome</div>
          <div className="text-sm -mt-2 leading-none">We are glad to see you back with us</div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 mt-10' autoComplete='off'>
            <div className="flex bg-[#F2F2F2] gap-2.5 py-2.5 px-3 rounded-xl w-[20rem]">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.5 22.5H18.5V20.5C18.5 18.8431 17.1569 17.5 15.5 17.5H9.5C7.84315 17.5 6.5 18.8431 6.5 20.5V22.5H4.5V20.5C4.5 17.7386 6.73858 15.5 9.5 15.5H15.5C18.2614 15.5 20.5 17.7386 20.5 20.5V22.5ZM12.5 13.5C9.18629 13.5 6.5 10.8137 6.5 7.5C6.5 4.18629 9.18629 1.5 12.5 1.5C15.8137 1.5 18.5 4.18629 18.5 7.5C18.5 10.8137 15.8137 13.5 12.5 13.5ZM12.5 11.5C14.7091 11.5 16.5 9.70914 16.5 7.5C16.5 5.29086 14.7091 3.5 12.5 3.5C10.2909 3.5 8.5 5.29086 8.5 7.5C8.5 9.70914 10.2909 11.5 12.5 11.5Z" fill="#1C1C1C" /></svg>
              <input type="email" name="email" id="email-input" className='bg-[#F2F2F2] outline-none w-full text-[15px]' placeholder='Email' required></input>
            </div>
            <div className="flex bg-[#F2F2F2] gap-2.5 py-2.5 px-3 rounded-xl w-[20rem]">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 8.5V7.5C6.5 4.18629 9.18629 1.5 12.5 1.5C15.8137 1.5 18.5 4.18629 18.5 7.5V8.5H20.5C21.0523 8.5 21.5 8.94772 21.5 9.5V21.5C21.5 22.0523 21.0523 22.5 20.5 22.5H4.5C3.94772 22.5 3.5 22.0523 3.5 21.5V9.5C3.5 8.94772 3.94772 8.5 4.5 8.5H6.5ZM19.5 10.5H5.5V20.5H19.5V10.5ZM11.5 16.2324C10.9022 15.8866 10.5 15.2403 10.5 14.5C10.5 13.3954 11.3954 12.5 12.5 12.5C13.6046 12.5 14.5 13.3954 14.5 14.5C14.5 15.2403 14.0978 15.8866 13.5 16.2324V18.5H11.5V16.2324ZM8.5 8.5H16.5V7.5C16.5 5.29086 14.7091 3.5 12.5 3.5C10.2909 3.5 8.5 5.29086 8.5 7.5V8.5Z" fill="#1C1C1C" /></svg>
              <input type="password" name="password" id="password-input" className='bg-[#F2F2F2] outline-none w-full text-[15px]' placeholder='Password' required></input>
            </div>
            <div className="flex justify-between text-sm ms-1">
              <div className="flex gap-[6px] items-center">
                <input type="checkbox" name="remember" id="remember" className='accent-black scale-[1.15] mt-[1px]' />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/" className='text-blue-700'>Forgot password?</a>
            </div>
            <button type="submit" className='bg-black text-white p-3.5 rounded-xl font-bold mt-2'>LOGIN</button>
          </form>
          <span className='mt-auto mb-1'>Don't have an account? <a href="register" className='font-medium text-black no-underline'>Register Now!</a></span>
        </div>
      </div>
    </div>
  </>
  )
}

export default LoginPage
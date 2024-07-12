import React, { useEffect, useState } from 'react';
import avatarSVG from './avatar.svg';
import cartSVG from './cart.svg';
import axios from 'axios';
import Clock from 'react-live-clock';
import { toast } from '../../..';
import { useNavigate } from 'react-router-dom';

const CashierDashboard = () => {

  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [customerData, setCustomerData] = useState({
    new: false,
    name: '',
    phone: '',
    address: '',
  });
  const [proceeded, setProceeded] = useState(false);

  useEffect(() => {
    axios.get('/staff/profile')
      .then((response) => {
        setProfile(response.data);
      })
      .catch(() => {
        navigate('/');
      });
  }, []);

  useEffect(() => {
    setProceeded(false);
  }, [customerData]);

  const handleProceed = (e) => {
    e.preventDefault();
    setProceeded(true);
  }

  const handleProceedCart = (e) => {
    e.preventDefault();
    if (customerData.new) {
      const toastId = toast.loading('Adding new customer...');
      axios.post('/customers/', {
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.address,
      })
        .then(() => {
          toast.success('Customer added successfully!', { id: toastId });
          navigate('/cashier/cart', { state: { customerData } });
        })
        .catch(() => {
          toast.error('Failed to add customer!', { id: toastId });
        });
    }
    else {
      navigate('/cashier/cart', { state: { customerData } });
    }
  }

  return (
    <>
      <div className="text-center h3 my-3">New Order</div>
      <div className="flex flex-col lg:flex-row h-full overflow-clip gap-2">
        <LeftSection profile={profile} />
        <MiddleSection customerData={customerData} setCustomerData={setCustomerData} handleProceed={handleProceed} />
        <RightSection customerData={customerData} proceeded={proceeded} handleProceedCart={handleProceedCart} />
      </div>
    </>
  );
};

const LeftSection = ({ profile }) => {
  return (
    <div className="lg:basis-1/4 bg-[#FFF6E9] flex flex-col items-center h-[3rem] lg:h-auto text-center rounded-[1rem] p-3 justify-between">
      <div className="h-[18%]"></div>
      <img
        src={avatarSVG}
        alt="Profile"
        style={{
          width: '50%',
          maxHeight: '100%',
          border: 'solid 3px #ff6f00',
          borderRadius: '100%',
        }}
      />
      <div className="h-[10%]"></div>
      <div className="">
        <div className="!text-[#ff6f00] h2 !font-semibold leading-none !mb-[3px]">
          {profile?.name}
        </div>
        <div className="!text-[#ff6f00] !font-medium leading-none">
          {profile?.email}
        </div>
      </div>
      <div className="h-[13%]"></div>
      <div className="bg-[#ff6f00] !text-white h5 !font-semibold py-1.5 px-4 rounded-full m-0">
        CASHIER
      </div>
      <div className="h-[58%]"></div>
      <div className="flex flex-col bg-[#ff6f00] bg-opacity-[20%] w-full max-w-[14rem] pt-[1.25rem] pb-[8px] rounded-[1.5rem]">
        <div className="font-semibold text-xl leading-none !mb-[8px]">
          Live Clock
        </div>
        <h3>
          <Clock format="hh:mm:ss A" interval={1000} ticking={true} />
        </h3>
      </div>
      <div className="h-[5%]"></div>
    </div>
  );
};

const MiddleSection = ({ customerData, setCustomerData, handleProceed }) => {

  const [lastCheckedPhone, setLastCheckedPhone] = useState(null);

  useEffect(() => {
    if (customerData.phone && customerData.phone.length === 10) {
      setCustomerData({ ...customerData, name: 'Loading...', address: 'Loading...', new: false });
      checkIfCustomerExists(customerData.phone);
    }
    else {
      setCustomerData({ ...customerData, name: '', address: '', new: false });
    }
  }, [customerData.phone]);


  const checkIfCustomerExists = (phone) => {
    axios.get(`/customers/mobile/${phone}`)
      .then((response) => {
        console.log(response.data);
        console.log(phone);
        console.log(customerData.phone);
        if (response.data && phone === customerData.phone) {
          setCustomerData({
            name: response.data.c_name,
            address: response.data.c_address,
            phone: response.data.c_contact,
            new: false,
          });
        }
        else {
          setCustomerData({ ...customerData, name: '', address: '', new: true });
        }
        setLastCheckedPhone(phone);
      })
      .catch(() => {
        setCustomerData({ ...customerData, name: '', address: '', new: true });
        setLastCheckedPhone(phone);
      });
  }

  const isPhoneDone = lastCheckedPhone === customerData.phone;

  return (
    <div className="lg:basis-1/2 flex flex-col p-4 pt-3">
      <div className="h3 !text-[#FF6F00] !font-semibold !m-0">Customer Details</div>
      <div className="bg-[#FF6F00] h-[3px] w-full mt-2 mb-4 rounded-full"></div>
      <form className="p-0 rounded-xl grow flex flex-col" onSubmit={handleProceed}>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label font-medium flex justify-between">
            <span>
              Phone <span className="text-danger">*</span>
            </span>
            <span className="text-gray-400">({(customerData.phone).length}/10 digits)</span>
          </label>
          <input
            type="tel"
            className="form-control"
            id="contact"
            value={customerData.phone}
            onChange={(e) =>
              setCustomerData({ ...customerData, phone: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label font-medium">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={customerData.name}
            onChange={(e) =>
              setCustomerData({ ...customerData, name: e.target.value })
            }
            required
            disabled={!isPhoneDone || !customerData.new}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label font-medium">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={customerData.address}
            onChange={(e) =>
              setCustomerData({ ...customerData, address: e.target.value })
            }
            disabled={!isPhoneDone || !customerData.new}
          />
        </div>
        <div className="grow"></div>
        <button
          type="submit"
          className={`self-end text-lg font-semibold bg-[#ff9e1f] py-2 px-3 rounded-xl flex items-center gap-2 mb-0.5 w-fit ${!isPhoneDone && 'opacity-50 !cursor-not-allowed'}`}
          disabled={!isPhoneDone}
        >
          Proceed
        </button>

      </form>
    </div>
  );
};

const RightSection = ({ customerData, handleProceedCart, proceeded }) => {
  return <div className="lg:basis-1/3 bg-[#9dd1ed] rounded-[1rem] p-4 pt-3 flex flex-col">
    <div className="h3 !text-[#165bc9] !font-semibold !m-0">Verify Details</div>
    <div className="bg-[#165bc9] h-[3px] w-full mt-2 mb-4 rounded-full"></div>
    {proceeded
      ?
      <div className="flex flex-col gap-3 text-lg h-full">
        <div className="flex flex-col">
          <span className="font-semibold">Name:</span>
          <span className='font-medium'>{customerData.name}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Phone:</span>
          <span className='font-medium'>{customerData.phone}</span>
        </div>
        {customerData.address && <div className="flex flex-col">
          <span className="font-semibold">Address:</span>
          <span className='font-medium'>{customerData.address}</span>
        </div>}
      </div>
      :
      <div className="h-full flex items-center justify-center mb-[3rem]">
        <div className="text-lg font-semibold text-[#165bc9]">Please fill the details and proceed</div>
      </div>
    }
    <button
      type="submit"
      className={`self-end text-lg font-semibold bg-[#165bc9] py-2 px-3 rounded-xl flex items-center gap-2 mb-0.5 w-fit text-white ${!proceeded && 'opacity-50 !cursor-not-allowed'}`}
      disabled={!proceeded}
      onClick={handleProceedCart}
    >
      Proceed to Cart <img src={cartSVG} alt="cart" className="w-6" />
    </button>
  </div>

}

export default CashierDashboard;

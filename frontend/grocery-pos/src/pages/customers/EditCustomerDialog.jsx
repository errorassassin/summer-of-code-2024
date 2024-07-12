import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from '../../'

const EditCustomerDialog = ({ handleClose, customerID }) => {

  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    axios.get(`/customers/${customerID}`)
      .then((response) => {
        setCustomerData({
          name: response.data.c_name,
          phone: response.data.c_contact,
          address: response.data.c_address
        });
      })
      .catch((error) => {
        if (error?.response?.data?.error?.length > 0)
          toast.error(error.response.data.error)
        else
          toast.error('An error occurred')
      });
  }, [customerID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Customer...");
    axios.put(`/customers/${customerID}`, customerData)
      .then((response) => {
        toast.success('Customer details updated successfully!', { id: toastId });
        handleClose();
      })
      .catch((error) => {
        if (error?.response?.data?.error?.length > 0) {
          toast.error(error.response.data.error, { id: toastId });
        } else {
          toast.error('An error occurred', { id: toastId });
        }
      });
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] max-w-[92%]">
      <form className="my-3 p-3 bg-[#FFF6E9] rounded-xl shadow-md flex flex-col" onSubmit={handleSubmit}>
        <div className="text-2xl font-semibold mb-3">
          Edit Customer Details
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label font-medium">Name <span className="text-danger">*</span></label>
          <input type="text" className='form-control' value={customerData?.name} onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label font-medium">Contact No. <span className="text-danger">*</span></label>
          <input type="text" className='form-control' value={customerData?.phone} onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label font-medium">Address</label>
          <input className='form-control' value={customerData?.address} onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}></input>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className="text-md font-semibold bg-[#ff9e1f] py-2 px-3 rounded-xl flex items-center gap-2 mb-0.5"
          >
            Cancel
          </button>
          <button
            type='submit'
            className="text-md font-semibold bg-[#ff9e1f] py-2 px-3 rounded-xl flex items-center gap-2 mb-0.5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCustomerDialog
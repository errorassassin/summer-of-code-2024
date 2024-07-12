import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from '../..';
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditCustomerDialog from './EditCustomerDialog';

const Customers = () => {
  const [showForm, setShowForm] = useState(false);
  const [customersData, setCustomersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(null);

  const handleClose = (e) => {
    setShowEditDialog(null);
  };

  useEffect(() => {
    axios.get('/customers/')
      .then((response) => {
        setCustomersData(response.data);
      })
      .catch((error) => {
        if (error?.response?.data?.error?.length > 0)
          toast.error(error.response.data.error)
        else
          toast.error('An error occurred')
      });
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Adding Customer...");
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('contact');
    const address = formData.get('address');

    axios.post('/customers/', {
      name, phone, address
    })
      .then((response) => {
        toast.success('Customer added successfully!', { id: toastId });
        setCustomersData([...customersData, response.data]);
        e.target.reset();
      })
      .catch((error) => {
        if (error?.response?.data?.error?.length > 0) {
          toast.error(error.response.data.error, { id: toastId });
        } else {
          toast.error('An error occurred', { id: toastId });
        }
      });
  };

  // Filter customersData based on searchQuery
  const filteredCustomers = customersData.filter(customer =>
    customer.c_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.c_contact.includes(searchQuery) ||
    customer.c_address.toLowerCase().includes(searchQuery.toLowerCase())    
  ).reverse();

  return (
    <>
      <div className="flex flex-col justify-between mt-[1.8rem] sm:flex-row items-start sm:items-center gap-2">
        <div className="text-3xl font-semibold">
          Customers Details
        </div>
        <button
          onClick={toggleForm}
          className="text-md font-semibold bg-[#ff9e1f] py-2 px-3 rounded-xl flex items-center gap-1.5"
        >
          {showForm ? <>Cancel</> : <><PersonAddAlt1Icon /> Add New</>}
        </button>
      </div>

      {showForm && (
        <form className="my-3 p-3 bg-[#FFF6E9] rounded-xl shadow-md" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label font-medium">Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label font-medium">Contact No. <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="contact" name="contact" placeholder="Enter contact number" required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label font-medium">Address</label>
            <textarea className="form-control" id="address" name="address" placeholder="Enter address" />
          </div>
          <button
            type='submit'
            className="text-md font-semibold bg-[#ff9e1f] py-2 px-3 rounded-xl flex items-center gap-2 mb-0.5"
          >
            <PersonAddAlt1Icon />
            Add
          </button>
        </form>
      )}

      <div className="mt-[2rem]">
        <input
          type="text"
          placeholder="Search..."
          className="form-control mb-2.5 !font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact No.</th>
              <th>Address</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.cid}>
                <td>{customer.c_name}</td>
                <td>{customer.c_contact}</td>
                <td>{customer.c_address}</td>
                <td className='text-center'>
                  <EditIcon className="cursor-pointer text-gray-600 me-1" onClick={()=>setShowEditDialog(customer.c_id)} />
                  <DeleteIcon className="cursor-pointer text-red-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {showEditDialog && (
        <EditCustomerDialog
          customerID={showEditDialog}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Customers;

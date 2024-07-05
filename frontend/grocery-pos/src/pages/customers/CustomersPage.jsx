import React, { useEffect, useState } from 'react';
import addSVG from './add.svg';
import axios from 'axios';
import { toast } from '../..';
import Table from 'react-bootstrap/Table';

const Customers = () => {
  const [showForm, setShowForm] = useState(false);
  const [customersData, setCustomersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('/customers/')
      .then((response) => {
        setCustomersData(response.data);
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
    const email = formData.get('email');
    const phone = formData.get('contact');

    axios.post('/customers/', {
      name, email, phone
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
    customer.c_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.c_contact.includes(searchQuery)
  ).reverse();

  return (
    <>
      <div className="flex flex-col justify-between mt-[1.8rem] sm:flex-row items-start sm:items-center gap-2">
        <div className="text-3xl font-semibold">
          Customers Details
        </div>
        <button
          onClick={toggleForm}
          className="text-md font-semibold bg-[#FF7F3E] py-2 px-3 rounded-xl flex items-center gap-1.5"
        >
          {showForm ? <>Cancel</> : <><img src={addSVG} alt="Add" /> Add New</>}
        </button>
      </div>

      {showForm && (
        <form className="my-3 p-3 bg-[#FFF6E9] rounded-xl shadow-md" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label font-medium">Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label font-medium">Email address <span className="text-danger">*</span></label>
            <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label font-medium">Contact Number</label>
            <input type="text" className="form-control" id="contact" name="contact" placeholder="Enter contact number" />
          </div>
          <button
            type='submit'
            className="text-md font-semibold bg-[#FF7F3E] py-2 px-3 rounded-xl flex items-center gap-2 mb-0.5"
          >
            <img src={addSVG} alt="Add" />
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
              <th>Email</th>
              <th>Contact No.</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.cid}>
                <td>{customer.c_name}</td>
                <td>{customer.c_email}</td>
                <td>{customer.c_contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Customers;

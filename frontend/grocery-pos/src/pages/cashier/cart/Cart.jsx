import React from 'react'
import { useLocation } from 'react-router-dom'

const Cart = () => {

  const location = useLocation();
  const customerData = location.state.customerData;

  console.log(customerData);

  return (
    <div>Cart</div>
  )
}

export default Cart
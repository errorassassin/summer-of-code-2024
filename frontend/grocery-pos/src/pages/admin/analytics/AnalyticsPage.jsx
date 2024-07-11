import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'

const AnalyticsPage = () => {

  const [topSoldStocks, setTopSoldStocks] = useState([
    { name: 'Rice', quantity: 100 },
    { name: 'Sugar', quantity: 80 },
    { name: 'Wheat', quantity: 70 },
    { name: 'Bread', quantity: 20 },
    { name: 'Butter', quantity: 10 },
    { name: 'Cheese', quantity: 5 },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    { name: 'Pulkit Agrawal', items: 5, total: 500 },
    { name: 'Rahul Jain', items: 3, total: 300 },
    { name: 'Amit Kumar', items: 2, total: 200 },
    { name: 'Rohit Sharma', items: 1, total: 100 },
    { name: 'Virat Kohli', items: 1, total: 100 },
  ]);

  const [neededStocks, setNeededStocks] = useState([
    { name: 'Cheese', quantity: 5 },
    { name: 'Butter', quantity: 10 },
    { name: 'Bread', quantity: 20 },
    { name: 'Wheat', quantity: 70 },
  ]);

  const [allStocks, setAllStocks] = useState([
    { name: 'Rice', sku: '22a' },
    { name: 'Sugar', sku: '10f' },
    { name: 'Wheat', sku: '3g2' },
    { name: 'Bread', sku: '4h3' },
    { name: 'Butter', sku: '5j6' },
    { name: 'Cheese', sku: '6k7' },
    { name: 'Milk', sku: '7l8' },
    { name: 'Eggs', sku: '8m9' },
  ]);

  const [selectedStockSKU, setSelectedStockSKU] = useState(null);

  const handlePDF = () => {
    alert('Try again later. This feature is under development.');
  }

  const getStockBySKU = (sku) => {
    const stock = allStocks.find(stock => stock.sku === sku);
    return stock?.name || 'Select Stock';
  }

  return (
    <>
      <div className="flex flex-col justify-between my-[1.8rem] sm:flex-row items-start sm:items-center gap-2">
        <div className="text-3xl font-semibold">
          Store Analytics
        </div>
        <button
          onClick={handlePDF}
          className="text-md font-semibold bg-[#ff9e1f] py-2 px-3 rounded-xl flex items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" /></svg>
          Export PDF
        </button>
      </div>

      <div className="my-[2.2rem]">
        <div className="font-semibold text-2xl my-2">Top Sold Stocks</div>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 sm:gap-5">
          {
            topSoldStocks.map((stock, index) => (
              <div key={index} className="bg-[#FFF6E9] p-4 rounded-lg shadow-md">
                <div className="text-2xl font-semibold leading-none mb-2">{stock.name}</div>
                <div className="text-md text-gray-500 leading-none">{stock.quantity} units sold</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="mt-[2.2rem]">
        <div className="font-semibold text-2xl my-2">Recent Orders (24 hours)</div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              recentOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.items}</td>
                  <td>₹{order.total}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      <div className="mt-[1rem]">
        <div className="font-semibold text-2xl my-2">Top Needed Stocks</div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Material</th>
              <th>Quantity Left</th>
            </tr>
          </thead>
          <tbody>
            {
              neededStocks.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
      <div className="mt-[1rem]">
        <div className="font-semibold text-2xl my-2 flex items-center gap-3">View Stock
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedStockSKU ? getStockBySKU(selectedStockSKU) : 'Select Stock'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                allStocks.map((stock, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => setSelectedStockSKU(stock.sku)}
                  >
                    {stock.name}
                  </Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {selectedStockSKU?<StockDetails selectedStockSKU={selectedStockSKU} allStocks={allStocks} />:<div className="text-gray-500">Select a stock to view details</div>}
      </div>


      <div className="h-[1rem] w-full"></div>
    </>
  )
}

const StockDetails = ({ selectedStockSKU, allStocks }) => {
  const stock = allStocks.find(stock => stock.sku === selectedStockSKU);
  return (
    <div className="mt-[1rem]">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{stock.sku}</td>
            <td>{stock.name}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default AnalyticsPage
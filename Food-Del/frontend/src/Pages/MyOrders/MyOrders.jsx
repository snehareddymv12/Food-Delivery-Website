import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import './MyOrders.css';
import { StoreContext } from '../../Components/Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

Modal.setAppElement('#root'); // Set the app element for accessibility

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      const sortedOrders = response.data.data.sort((a, b) => b._id.localeCompare(a._id));
      setData(sortedOrders);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const filteredOrders = data.filter(order => 
    order.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className='my-orders'>
      <div className='header-container'>
        <h2>My Orders</h2>
        <input
          type='text'
          placeholder='Search food items...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-bar'
        />
      </div>
      <div className='container'>
        {filteredOrders.map((order, index) => {
          return (
            <div key={index} className='my-orders-order' onClick={() => openModal(order)}>
              <img src={assets.parcel_icon} alt='' />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",  ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={(event) => { event.stopPropagation(); fetchOrders(); }}>Track Order</button>
            </div>
          );
        })}
      </div>
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onRequestClose={closeModal}
          contentLabel='Order Details'
          className='order-modal'
          overlayClassName='order-modal-overlay'
        >
          <h2>Order Details</h2>
          <div className='modal-content'>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
            <p><strong>Address:</strong> {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.country}, {selectedOrder.address.zipcode}</p>
            <p><strong>Phone:</strong> {selectedOrder.address.phone}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
            <p><strong>Total Amount:</strong> ${selectedOrder.amount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyOrders;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

Modal.setAppElement('#root'); // Set the app element for accessibility

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        const sortedOrders = response.data.data.sort((a, b) => b._id.localeCompare(a._id));
        setOrders(sortedOrders);
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    event.stopPropagation(); // Stop event from propagating to the parent element
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  const filteredOrders = orders.filter(order => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      order.address.firstName.toLowerCase().includes(searchTermLower) ||
      order.address.lastName.toLowerCase().includes(searchTermLower) ||
      order.address.city.toLowerCase().includes(searchTermLower) ||
      order.address.street.toLowerCase().includes(searchTermLower) ||
      order.address.state.toLowerCase().includes(searchTermLower) ||
      order.address.country.toLowerCase().includes(searchTermLower) ||
      order.address.zipcode.includes(searchTermLower) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTermLower))
    );
  });

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className='order add'>
      <div className='header-container'>
        <h3>Order Page</h3>
        <input
          type='text'
          placeholder='Search orders...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-bar'
        />
      </div>
      <div className='order-list'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index} className='order-item' onClick={() => openModal(order)}>
              <img src={assets.parcel_icon} alt='' />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return item.name + ' x ' + item.quantity;
                    } else {
                      return item.name + ' x ' + item.quantity + ', ';
                    }
                  })}
                </p>
                <p className='order-item-name'>
                  {order.address.firstName + ' ' + order.address.lastName}
                </p>
                <div className='order-item-address'>
                  <p>{order.address.street + ','}</p>
                  <p>
                    {order.address.city + ',' + order.address.state + ',' + order.address.country + ',' + order.address.zipcode}
                  </p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select onClick={(event) => event.stopPropagation()} onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value='Food Processing'>Food Processing</option>
                <option value='Out for Delivery'>Out For Delivery</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
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

export default Orders;

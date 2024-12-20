import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/user.service';
import ShowOrders from './show-orders';
import './order-history.css'; // Import the CSS file
const OrderHistory = () => {
const [ordersData, setOrdersData] = useState(null);

    useEffect(() => {   
        getOrders().then(data => setOrdersData(data));
    }, []);

    return (
        <div>
             <nav className="navbar">
                <div className="navbar-brand">Order History</div>
                <ul className="navbar-nav">
                    <li className="nav-item"><a href="/home">Home</a></li>
                </ul>
            </nav>
    
        <div className="order-container">
            <h1 className="order-title">Previous orders</h1>
                
                  {ordersData?<ShowOrders ordersData={ordersData} />:'Loading...'}
        </div>
       
        </div>
    );
};
export default OrderHistory;
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
        <a href="/order">Order</a>
    
        <div className="home-container">
            <h1 className="home-title">Previous orders</h1>
            {/* <div className="home-orders"> */}
       
              {/* {ordersData && ordersData.map(order => ( */}
            
                
                  {ordersData?<ShowOrders ordersData={ordersData} />:'Loading...'}
                 
              
              {/* ))} */}
            {/* </div> */}
        </div>
        <div><a href='/home'>Home</a></div>
        </div>
    );
};
export default OrderHistory;
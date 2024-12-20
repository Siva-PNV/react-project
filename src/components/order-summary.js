import React, { useEffect } from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import './order-summary.css'; // Import the CSS file
import { saveOrder } from "../services/user.service";

const OrderSummary = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const { order, totalAmount,restarantDetails } = location.state?location.state:{order:null,totalAmount:null,restarantDetails:null};

    useEffect(() => {
        if (!order || !totalAmount || !restarantDetails) {
            navigation('/home');
        }
    }, [navigation, order, totalAmount,restarantDetails]);

    const pay=async()=>{
        try {
            await saveOrder(order, totalAmount,restarantDetails);
            alert('Payment Successful');
            navigation('/home');

        } catch (error) {
            alert('Payment Failed');
        }
    }

    return (
        <div> <nav className="navbar">
        <div className="navbar-brand">Order History</div>
        <ul className="navbar-nav">
            <li className="nav-item"><a href="/home">Home</a></li>
        </ul>
    </nav>
        <div className="order-summary">
            <h2>Order Summary</h2>
            {order && order.map((item, index) => (
                <div key={index} className="order-item">
                    <p>Item: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            <p>Total Amount: {totalAmount}</p>

            <div> 
            {/* <button onClick={backToSelect}>Previous</button> */}
                <button onClick={pay}>Pay</button>
              
            </div>

        </div>
        </div>
    );
};

export default OrderSummary;
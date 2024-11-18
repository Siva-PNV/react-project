import React from "react";
import { useLocation,useNavigate } from 'react-router-dom';
import './order-summary.css'; // Import the CSS file
import { saveOrder } from "../services/user.service";

const OrderSummary = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const { order, totalAmount } = location.state;

    const pay=async()=>{
        try {
            await saveOrder(order, totalAmount);
            alert('Payment Successful');
            navigation('/home');

        } catch (error) {
            alert('Payment Failed');
        }
    }
    return (
        <div className="order-summary">
            <h2>Order Summary</h2>
            {order.map((item, index) => (
                <div key={index} className="order-item">
                    <p>Item: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            <p>Total Amount: {totalAmount}</p>

            <div> 
                <button onClick={pay}>Pay</button>
            </div>
        </div>
    );
};

export default OrderSummary;
import React from "react";
import "./show-orders.css";

const ShowOrders = ({ ordersData }) => {
    return (
        <div>
            <div className="home-orders">
                {ordersData.length > 0 ? ordersData.map(order => (
                    <div key={order.id} className="order-item">
                        <p id="date"> {order.date?'Date: '+order.date:''}</p>
                        {order.restarantDetails ? <p> <span> {order.restarantDetails.name} ({order.restarantDetails.location})</span></p> : ''}
                        <p> <span>Price: {order.total}</span></p>
                        {order.items.map((item, index) => (
                            <div key={index} className="item" style={{ margin: '10px' }}>
                                {item.map((key, itemIndex) => (
                                    <span key={itemIndex} className="item-detail">
                                        {itemIndex > 0 ? <span>,</span> : ''} <span> {key.name}({key.quantity})</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                )) : <div>No orders found</div>}
            </div>
        </div>
    );
}


export default ShowOrders;



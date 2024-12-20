import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './order.css'; // Import the CSS file
import { items } from '../assets/items'; // Import the items array


const OrderFood = () => {
    const [itemsList, setItemsList] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate(); 
    const location=useLocation();
    const restarantDetails = location.state ? location.state.restaurantDetails : null;
    
    useEffect(() => {
        if(!restarantDetails){
            navigate('/home');
        }
        setItemsList(items);
       
    }, [navigate, restarantDetails]);

    const handleAddItem = (foodItem) => {
        let price = foodItem.price;
        setTotalAmount(totalAmount + price);

        const newItem = { name: foodItem.name, quantity: 1, price };
        const existingItem = order.find(item => item.name === foodItem.name);

        if (existingItem) {
            const updatedOrder = order.map(item => {
                if (item.name === foodItem.name) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        price: item.price + price
                    };
                }
                return item;
            });
            setOrder(updatedOrder);
        } else {
            setOrder([...order, newItem]);
        }
    };

    const handleRemoveItem = (foodItem) => {
        const itemIndex = order.findIndex(item => item.name === foodItem.name);
        if (itemIndex !== -1) {
            const updatedOrder = [...order];
            if (updatedOrder[itemIndex].quantity === 1) {
                updatedOrder.splice(itemIndex, 1);
            } else {
                updatedOrder[itemIndex].quantity -= 1;
                updatedOrder[itemIndex].price -= foodItem.price;
            }
            setOrder(updatedOrder);
            setTotalAmount(totalAmount - foodItem.price);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted:', order);
        // Navigate to the order summary component
        navigate('/order-summary', { state: { order, totalAmount,restarantDetails } });
    };

    return (
        <div className="order-container">
            {restarantDetails && restarantDetails.name}
            <h1>Order Food</h1>
            <p>Order your favorite food here</p>
            <form onSubmit={handleSubmit} className="order-form">
                {itemsList.map((foodItem, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div><img src={foodItem.logo} alt='logo' className='logo'></img></div>
                            <div>
                                <p>{foodItem.name}</p>
                                <p>{foodItem.price}</p>
                            </div>
                {order.filter(item => item.name === foodItem.name && item.quantity > 0).length > 0 ? (
                    <div>
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(foodItem)}
                            className="add-to-cart-button"
                        >
                            -
                        </button>
                        <div className="cart-count">
                            {order.map(item => (
                                item.name === foodItem.name ? (
                                    <p key={item.name}>{item.quantity}</p>
                                ) : null
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => handleAddItem(foodItem)}
                            className="add-to-cart-button"
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => handleAddItem(foodItem)}
                        className="add-to-cart-button"
                    >
                        ADD
                    </button>
                )}
                           
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex' }}>
                    <button type="submit" className="order-button">
                        Proceed to Pay
                    </button>
                </div>
            </form>

            <div> <a href="/home">Home</a></div>
        </div>
    );
};

export default OrderFood;
import React from 'react';
import './Home.css'; // Import the CSS file


const Home = () => {

    return (
        <div>
       
       <img src="images.jpeg" alt="profile" className="profile-icon"/>
        <div className="home-container">
       
        <a href="/order">Order</a>
        <a href="/order-history">History</a>
            </div>
        </div>
    );
};

export default Home;
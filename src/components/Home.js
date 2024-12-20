import React,{ useEffect, useState } from 'react';
import './Home.css'; // Import the CSS file
import { getRestaurants } from '../services/user.service';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [restaurants, setRestaurants] = useState([]);
    const navigate=useNavigate ();
    useEffect(() => {
       getRestaurants().then(data => {
           setRestaurants(data);
           console.log(data);
       });
    },[])

const navigateToOrder = (restaurant) => {
    navigate('/order',{state:{restaurantDetails:restaurant}});
}

    return (
        <div>
        <nav className="homenavbar">
                <div className="homenavbar-brand"> 
               <a href='/home'> <img src="images.jpeg" alt="profile" className="profile-icon"/></a>
                </div>
                <ul className="homenavbar-nav">
                    <li className="homenavbar-item"><a href="/order-history">Orders</a></li>
                </ul>
            </nav>
      
        <div className="restaurant-list">
       
      
        {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="restaurant-item" >
                         <button onClick={()=>navigateToOrder(restaurant)} >
                        <h1>{restaurant.name}</h1>
                        {/* <img src="chicken_biryani.jpeg" alt={restaurant.name} className='restarant-image'/> */}
                        <p>{restaurant.location}</p>
                        </button>
                        <span role="img" aria-label="1 star">⭐</span>{restaurant.rating }
                    </div>
                ))}
           
            </div>

           
        </div>
    );
};


export default Home;
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import LoginComponent from './components/Login';
import Home from './components/Home';
import './App.css';
import Register from './components/register';
import OrderFood from './components/order';
import OrderSummary from './components/order-summary';  
import OrderHistory from './components/order-history';


function App() {
  // const [message, setMessage] = useState('Hello World');
  return (
    <Router>
        {/* <Switch> */}
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order" element={<OrderFood />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/order-history" element={<OrderHistory />} />
        {/* </Switch> */}
        </Routes>
    </Router>
    // <TestComponent />
    // <Home/>
);
}

export default App;

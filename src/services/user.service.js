
const API_URL = 'http://localhost:3001/users';
const API_URL_ORDERS = 'http://localhost:3001/orders';
const API_URL_RESTAURANTS = 'http://localhost:3001/restaurants';



const getUsers = async () => {
    const response = await fetch(API_URL);
    if(!response){
        throw new Error('Error fetching data');
    }
   const data = await response.json();
    return data;
}

const validateUser = async (username, password) => {
    const users = await getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    console.log(user);
    if(user!==undefined){
        localStorage.setItem('id', user.id);
    }
   
    return user!==undefined;
}


const addUser = async (user) => {
    const users = await getUsers();
    console.log(users);
    var id;
    if(users && users.length>0){
    const lastUser=users[users.length-1];
    console.log(typeof lastUser.id);
  id=String(Number(lastUser.id)+1);
    }else{
        id=String(1);
    }
    const newUser={...user,id};
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });
    if(!response){
        throw new Error('Error adding user');
    }
    return response.json();
}

const getOrders = async () => {
    const response = await fetch(API_URL_ORDERS);
    if(!response){
        throw new Error('Error fetching data');
    }
    const data = await response.json();
    console.log(data);
    const filtredData=data.filter(order=>order.userId===localStorage.getItem('id'));
    return filtredData;
}

const saveOrder = async (items,totalAmount,restarantDetails) => {
    const allOrders = await getOrders();
    var id;
    if(allOrders && allOrders.length>0){
    const lastOrder=allOrders[allOrders.length-1];
        id=String(Number(lastOrder.id)+1);
    }else{
        id=String(1);
    }
    // const date=new Date().getDate;
    const newOrder={items:[items],id,userId:localStorage.getItem('id'),total:totalAmount,restarantDetails:restarantDetails,date:new Date().toLocaleDateString()};
    const response=await fetch(API_URL_ORDERS, { method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)})
        if(!response){
            throw new Error('Error adding user');
        }
        return response.json();
}

const getRestaurants = async () => {
    const response = await fetch(API_URL_RESTAURANTS);
    if(!response){
        throw new Error('Error fetching data');
    }
    const data = await response.json();
    return data;
}

export { getUsers, validateUser, addUser,getOrders ,saveOrder,getRestaurants} ;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://food-delivery-app-5d5eb.firebaseio.com'
});

export default instance;
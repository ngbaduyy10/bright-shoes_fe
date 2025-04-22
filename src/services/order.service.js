import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const createOrder = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/order/create`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const getOrdersByUserId = async (userId) => {
    const response = await axios.get(`${BASE_URL}/order/${userId}`);
    return response.data;
}

export const orderCheck = async (data) => {
    const response = await axios.get(`${BASE_URL}/order/check/${data.userId}/${data.shoesId}`);
    return response.data;
}

export const getAllOrders = async () => {
    const response = await axios.get(`${BASE_URL}/order`);
    return response.data;
}

export const updateOrderStatus = async (orderId, data) => {
    const response = await axios.patch(
        `${BASE_URL}/order/status/${orderId}`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}
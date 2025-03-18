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
import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getAllDiscounts = async () => {
    const response = await axios.get(`${BASE_URL}/discount`);
    return response.data;
}

export const getDiscountByOrderValue = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/discount/value`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}
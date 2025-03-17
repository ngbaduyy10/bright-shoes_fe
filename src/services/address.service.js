import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getAddress = async (userId) => {
    const response = await axios.get(`${BASE_URL}/address/${userId}`);
    return response.data;
}

export const addAddress = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/address/add`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const editAddress = async (addressId, data) => {
    const response = await axios.patch(
        `${BASE_URL}/address/edit/${addressId}`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const deleteAddress = async (addressId) => {
    const response = await axios.delete(`${BASE_URL}/address/delete/${addressId}`);
    return response.data;
}
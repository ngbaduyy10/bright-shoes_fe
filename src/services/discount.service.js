import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getAllDiscounts = async () => {
    const response = await axios.get(`${BASE_URL}/discount`);
    return response.data;
}
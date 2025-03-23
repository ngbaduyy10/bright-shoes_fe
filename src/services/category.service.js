import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data;
}
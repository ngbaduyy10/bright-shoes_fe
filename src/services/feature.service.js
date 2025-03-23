import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getFeatures = async () => {
    const response = await axios.get(`${BASE_URL}/feature`);
    return response.data;
}
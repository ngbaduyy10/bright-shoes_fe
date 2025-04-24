import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getAdmins = async () => {
    const response = await axios.get(BASE_URL + "/user/admin");
    return response.data;
}

export const getCustomers = async () => {
    const response = await axios.get(BASE_URL + "/user/customer");
    return response.data;
}
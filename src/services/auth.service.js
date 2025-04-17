import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const createAdmin = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/auth/admin/create`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const adminLogin = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/auth/admin/login`,
        data,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
}

export const adminLogout = async () => {
    const response = await axios.get(`${BASE_URL}/auth/admin/logout`, { withCredentials: true });
    return response.data;
}

export const authChecking = async () => {
    const response = await axios.get(`${BASE_URL}/auth/auth-check`, { withCredentials: true });
    return response.data;
}
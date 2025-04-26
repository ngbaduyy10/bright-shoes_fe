import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const getAdmins = async (data) => {
    const response = await axios.get(
        BASE_URL + "/user/admin",
        {
            params: {
                keyword: data?.keyword,
            }
        }
    )
    return response.data;
}

export const createAdmin = async (data) => {
    const response = await axios.post(
        BASE_URL + "/user/admin",
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
}

export const updateAdmin = async (id, data) => {
    const response = await axios.patch(
        BASE_URL + `/user/admin/${id}`,
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
}

export const getCustomers = async () => {
    const response = await axios.get(BASE_URL + "/user/customer");
    return response.data;
}
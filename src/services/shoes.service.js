import axios from "axios";
import { BASE_URL } from "../utils/index.js";

export const getShoes = async (data) => {
    const response = await axios.post(
        BASE_URL + "/shoes",
        data,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

export const getShoeById = async (shoesId) => {
    const response = await axios.get(BASE_URL + "/shoes/" + shoesId);
    return response.data;
};

export const createShoes = async (data) => {
    const response = await axios.post(
        BASE_URL + "/shoes/create",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }
    );
    return response.data;
}

export const updateShoes = async (shoesId, data) => {
    const response = await axios.patch(
        BASE_URL + "/shoes/update/" + shoesId,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }
    );
    return response.data;
};

export const deleteShoes = async (shoesId) => {
    const response = await axios.delete(BASE_URL + "/shoes/delete/" + shoesId);
    return response.data;
};

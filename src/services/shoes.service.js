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
}

export const getShoeById = async (shoesId) => {
    const response = await axios.get(BASE_URL + "/shoes/" + shoesId);
    return response.data;
}

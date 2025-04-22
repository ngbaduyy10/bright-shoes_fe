import axios from "axios";
import { BASE_URL } from "../utils/index.js";

export const getShoes = async () => {
    const response = await axios.get(BASE_URL + "/shoes");
    return response.data;
};

export const getShoeById = async (shoesId) => {
    const response = await axios.get(BASE_URL + "/shoes/" + shoesId);
    return response.data;
};

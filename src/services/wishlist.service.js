import axios from 'axios';
import { BASE_URL } from "@/utils/index.js";

export const addToWishlist = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/wishlist/add`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return response.data;
}

export const removeFromWishlist = async (data) => {
    const response = await axios.patch(
        `${BASE_URL}/wishlist/remove`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return response.data;
}

export const getWishlistItems = async (id) => {
    const response = await axios.get(`${BASE_URL}/wishlist/${id}`);
    return response.data;
}

export const wishlistCheck = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/wishlist/check`,
        data,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return response.data;
}
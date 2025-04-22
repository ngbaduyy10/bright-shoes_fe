import feature_1 from "@/assets/feature_1.png";
import feature_2 from "@/assets/feature_2.png";
import feature_3 from "@/assets/feature_3.svg";
import feature_4 from "@/assets/feature_4.svg";
import feature_5 from "@/assets/feature_5.png";
import feature_6 from "@/assets/feature_6.png";

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const brandOptions = [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
]

export const sortOptions = [
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "rating-asc", label: "Rating: Low to High" },
    { id: "rating-desc", label: "Rating: High to Low" },
    { id: "default", label: "Default" },
];

export const keyFeatures = [
    {
        imgSrc: feature_1,
        title: 'A better resume in minutes',
        desc: 'Tick every box and make sure your resume is never filtered out by the hiring software.',
    },
    {
        imgSrc: feature_2,
        title: 'ATS-friendly templates',
        desc: 'Replace your old resume in a few simple clicks. Our builder gives recruiters what they want.',
    },
    {
        imgSrc: feature_3,
        title: 'Pre-written content',
        desc: 'Stop worrying about words. Save time by adding pre-approved, tested content from certified writers.',
    },
    {
        imgSrc: feature_4,
        title: 'Easy with AI',
        desc: 'Quickly generate formal phrases and summaries. Sound professional, faster.',
    },
    {
        imgSrc: feature_5,
        title: 'Beat the competition',
        desc: 'Our tested resume templates are designed to make you more attractive to recruiters.',
    },
    {
        imgSrc: feature_6,
        title: 'Get paid more',
        desc: 'A higher salary begins with a strong resume. Our salary analyzer tells you if your job offer is competitive.',
    },
];

export const itemList = [
    {
        id: 4,
        name: "Nike Air Force 1 '07",
        price: 170,
        image_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a42a5d53-2f99-4e78-a081-9d07a2d0774a/AIR+FORCE+1+%2707.png",
        description: "The Nike Air Force 1 '07 combines timeless charm with modern appeal. Crafted with premium leather and signature AF1 details, these sneakers are durable and stylish, ideal for both casual and formal settings.",
        totalStock: 100,
    },
    {
        id: 1,
        name: "Air Jordan 3 Retro",
        price: 190,
        image_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/66841fce-c51c-4ebd-8474-c11f8f117488/AIR+JORDAN+3+RETRO.png",
        description: "The Air Jordan 3 Retro offers a blend of vintage style and modern performance. Featuring iconic elephant print detailing and a visible air unit, it's a must-have for sneaker enthusiasts and collectors alike.",
        totalStock: 50,
    },
    {
        id: 2,
        name: "Nike LD-1000",
        price: 120,
        image_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0e26ef63-81c4-4ab2-8fb5-a4306745394e/W+LD-1000.png",
        description: "Designed for comfort and versatility, the Nike LD-1000 is perfect for everyday wear. With its sleek silhouette and lightweight cushioning, it pairs effortlessly with any outfit, making it your go-to sneaker.",
        totalStock: 75,
    },
    {
        id: 5,
        name: "Air Jordan 1 Mid",
        price: 150,
        image_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0dde9946-f6fd-4a13-a149-1c2f11ca0b11/AIR+JORDAN+1+MID.png",
        description: "Step up your game with the Air Jordan 1 Mid. This iconic model offers a perfect blend of heritage and innovation, celebrating MJ's legacy. Its versatile design makes it a staple for any sneaker collection.",
        totalStock: 80,
    },
    {
        id: 3,
        name: "Nike Dunk Low Retro",
        price: 110,
        image_url: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3f8c5b05-6d0f-49f4-b472-7425357e6a52/NIKE+DUNK+LOW+RETRO.png",
        description: "Embrace retro style with the Nike Dunk Low Retro. Featuring classic color blocking and a padded collar, these sneakers deliver both old-school aesthetics and all-day comfort for fashion-forward wearers.",
        totalStock: 60,
    },
];

export const paymentToString = (paymentMethod) => {
    switch (paymentMethod) {
        case "stripe":
            return "Stripe";
        case "cod":
            return "Cash on Delivery";
        default:
            return "Unknown";
    }
}

export const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'delivered':
            return 'bg-purple-500';
        case 'shipped':
            return 'bg-green-500';
        case 'cancelled':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};
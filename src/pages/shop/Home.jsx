import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {itemList, keyFeatures} from "@/utils/index.js";
import ItemCard from "@/components/ItemCard.jsx";
import {getFeatures} from "@/services/feature.service.js";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [featureImages, setFeatureImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchFeatureImages = async () => {
            const response = await getFeatures();
            if (response.success) {
                setFeatureImages(response.data);
            }
        }

        fetchFeatureImages();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImages.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [featureImages]);

    return (
        <div className="flex flex-col">
            <div className="relative w-full">
                {featureImages.length > 0 && featureImages.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.image_url}
                        alt={`slide-${index}`}
                        className={`${index === currentSlide ? "block" : "hidden"} w-full object-cover cursor-pointer`}
                        onClick={() => navigate(`/detail/${slide.shoes_id}`)}
                    />
                ))}
                <Button
                    variant="outline"
                    size="icon"
                    className="feature-button left-4 hover:opacity-100"
                    onClick={() => setCurrentSlide((prevSlide) => (
                        prevSlide - 1 + featureImages.length) % featureImages.length
                    )}
                >
                    <ChevronLeftIcon className="w-4 h-4"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="feature-button right-4 hover:opacity-100"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImages.length)}
                >
                    <ChevronRightIcon className="w-4 h-4"/>
                </Button>
            </div>

            <div className="container mx-auto pt-[70px] pb-[100px] px-2">
                <h1 className="text-4xl font-bold text-center mb-15">Get hired fast with a powerful resume</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                    {keyFeatures.map((feature, index) => (
                        <div key={index}>
                            <div className="flex gap-4">
                                <div className="w-1/7">
                                    <img src={feature.imgSrc} alt="" className="w-full h-auto"/>
                                </div>
                                <div className="w-6/7">
                                    <div className="text-2xl font-bold">{feature.title}</div>
                                    <p className="text-lg">{feature.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white">
                <div className="container mx-auto pt-[70px] pb-[100px] px-2 flex flex-col items-center">
                    <div className="text-4xl font-bold">Best Sellers</div>
                    <div className="text-lg text-foreground my-3 text-center">
                        Our best-selling shoes combine style, comfort, and durability. Shop now for the latest must-have
                        footwear!
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                        {itemList.map((item) => (
                            <ItemCard key={item.id} item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
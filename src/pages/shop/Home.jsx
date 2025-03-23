import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {itemList, categoriesIcon} from "@/utils/index.js";
import ItemCard from "@/components/ItemCard.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
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

            <div className="w-full px-4 md:px-10 lg:px-14 my-[100px] flex flex-col items-center">
                <div className="text-4xl font-bold">BEST SELLERS</div>
                <div className="text-lg text-foreground my-3 text-center">
                    Our best-selling shoes combine style, comfort, and durability. Shop now for the latest must-have footwear!
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                    {itemList.map((item) => (
                        <ItemCard key={item.id} item={item}/>
                    ))}
                </div>
            </div>

            <div className="w-full px-4 md:px-[100px] lg:px-[250px] xl:px-[400px] mb-[100px] text-center">
                <div className="text-4xl font-bold">SHOP BY CATEGORY</div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {categoriesIcon.map((category) => (
                        <Card
                            key={category.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow col-span-1"
                        >
                            <CardContent className="flex flex-col items-center justify-center">
                                <category.icon className="w-12 h-12 mb-4 text-primary"/>
                                <span className="font-bold">{category.label}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="w-full px-4 md:px-10 lg:px-14 mb-[100px] flex flex-col items-center">
                <div className="text-4xl font-bold">LATEST COLLECTIONS</div>
                <div className="text-lg text-foreground my-3 text-center">
                    Discover our latest shoe collections featuring modern designs, premium materials, and ultimate comfort. Shop now!
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                    {itemList.map((item) => (
                        <ItemCard key={item.id} item={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
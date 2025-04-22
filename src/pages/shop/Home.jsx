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
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{transform: `translateX(-${currentSlide * 100}%)`}}
                >
                    {featureImages.length > 0 && featureImages.map((slide, index) => (
                        <img
                            key={index}
                            src={slide.image_url}
                            alt={`slide-${index}`}
                            className="w-full flex-shrink-0 object-cover cursor-pointer"
                            onClick={() => navigate(`/detail/${slide.shoes_id}`)}
                        />
                    ))}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="feature-button left-4 hover:opacity-100 hover:bg-white"
                    onClick={() => setCurrentSlide((prevSlide) => (
                        prevSlide - 1 + featureImages.length) % featureImages.length
                    )}
                >
                    <ChevronLeftIcon className="w-4 h-4"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="feature-button right-4 hover:opacity-100 hover:bg-white"
                    onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImages.length)}
                >
                    <ChevronRightIcon className="w-4 h-4"/>
                </Button>
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

            <div className="bg-primary text-white">
                <div className="container mx-auto pt-[70px] pb-[100px] px-2">
                    <h1 className="text-4xl font-bold text-center mb-12">Why Our Shoes Stand Out</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-12">
                        {keyFeatures.map((feature, index) => (
                            <div key={index}>
                                <div className="flex gap-4">
                                    <div className="w-1/8">
                                        <img src={feature.imgSrc} alt="" className="w-full h-auto"/>
                                    </div>
                                    <div className="w-7/7">
                                        <div className="text-xl font-bold">{feature.title}</div>
                                        <p className="text-md">{feature.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="container mx-auto pt-[70px] pb-[100px]">
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                        <div className="flex flex-col w-full md:w-2/3">
                            <div className="text-4xl font-bold">
                                Who Said Ragers Were Not Meant to Fly?
                            </div>
                            <p className="text-lg text-foreground text-justify mt-5">
                                <p>Breaking boundaries both in fashion and flight, the Nike Air Jordan 1 x Travis Scott
                                    is more than just a sneaker—it’s a cultural statement. Born from one of the most
                                    iconic collaborations in streetwear history, this silhouette redefines what it means
                                    to elevate your game—literally and stylistically.</p>
                                <p className="mt-2">Crafted with meticulous attention to detail, the design features
                                    earthy Mocha tones that ground its bold presence, while premium leather overlays
                                    deliver both durability and a touch of luxury. The instantly recognizable reversed
                                    Swoosh flips the script on tradition, signaling a fearless approach to design that
                                    mirrors Travis Scott’s boundary-pushing artistry.</p>

                            </p>
                        </div>
                        <div className="flex justify-end rounded-lg overflow-hidden w-full md:w-1/3">
                            <img
                                src="https://ih1.redbubble.net/image.5290243029.5292/fposter,small,wall_texture,square_product,600x600.u3.jpg"
                                alt="Blog" className="aspect-square w-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="container mx-auto pt-[70px] pb-[100px]">
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                        <div className="flex justify-end rounded-lg overflow-hidden w-full md:w-1/3">
                            <img src="https://i.pinimg.com/736x/80/cb/6a/80cb6adbfeda6e42f1b5e883c39035ca.jpg"
                                 alt="Blog" className="aspect-square w-full object-cover"/>
                        </div>
                        <div className="flex flex-col w-full md:w-2/3">
                            <div className="text-4xl font-bold">
                                Unleash Adventure: Discover the New Sneakers Collection
                            </div>
                            <p className="text-lg text-foreground text-justify mt-5">
                                <p>Our New Sneakers Collection is built for those who don’t just walk — they explore,
                                    chase the horizon, and live for the thrill of the unknown. Whether you&#39;re an
                                    urban adventurer or a trailblazing outdoor enthusiast, these sneakers are the
                                    perfect companion for your journey.</p>
                                <p className="mt-2">Crafted with precision, this collection blends rugged durability
                                    with cutting-edge design. The breathable mesh uppers keep your feet cool and dry no
                                    matter the conditions, while the reinforced structure provides extra support for
                                    long treks or fast-paced days.</p>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
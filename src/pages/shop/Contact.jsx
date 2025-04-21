import LocationMap from "@/components/LocationMap";

const Contact = () => {
    const markers = [
        {
            position: { lat: 37.7749, lng: -122.4194 },
            title: "San Francisco",
            description: "The Golden Gate City",
        },
        {
            position: { lat: 37.8044, lng: -122.2712 },
            title: "Oakland",
            description: "The Town",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                My Google Maps App
            </h1>
            <div className="flex justify-center">
                <div className="w-4/5 md:w-3/4 lg:w-4/5 xl:w-3/4 rounded-lg shadow-xl overflow-hidden">
                    <LocationMap
                        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                        markers={markers}
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;

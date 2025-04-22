import LocationMap from "@/components/LocationMap";

const Contact = () => {
    const markers = [
        {
            position: { lat: 10.889883, lng: 106.802616 },
            title: "Chi nhánh Thủ Đức",
        },
        {
            position: { lat: 10.771853, lng: 106.658045 },
            title: "Chi nhánh Quận 10",
        },
        {
            position: { lat: 10.7607, lng: 106.667918 },
            title: "Chi nhánh Quận 5",
        },
        {
            position: { lat: 10.801567, lng: 106.710393 },
            title: "Chi nhánh Bình Thạnh",
        },
        {
            position: { lat: 10.803513, lng: 106.747091 },
            title: "Chi nhánh Thảo Điền",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                See our stores&apos; locations
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

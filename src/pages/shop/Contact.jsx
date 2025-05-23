import LocationMap from "@/components/LocationMap";
import { useState } from "react";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        error: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the form data to the server

        setFormStatus({ submitted: true, error: null });
        setFormData({ name: "", email: "", message: "" });

        // Reset status after 3 seconds
        setTimeout(() => {
            setFormStatus({ submitted: false, error: null });
        }, 3000);
    };

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

    const inputBoxStyle =
        "w-full py-2 bg-transparent border-t-0 border-l-0 border-r-0 border-b-1 border-white focus:outline-none transition duration-300";

    const containerVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold text-center mb-8 text-gray-800"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                Contact With Us
            </motion.h1>
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Contact Form - Left Column */}
                <motion.div className="w-full lg:w-2/5"
                            variants={containerVariant}
                            initial="hidden"
                            animate="visible"
                >
                    <div className="bg-primary text-white rounded-lg shadow-md p-6">
                        <h2 className="text-3xl font-bold">Get In Touch</h2>
                        <h3 className="text-white text-lg font-main mb-4">
                            Call or email us regarding questions or issues
                        </h3>

                        {formStatus.submitted && (
                            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}

                        {formStatus.error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {formStatus.error}
                            </div>
                        )}

                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputBoxStyle}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputBoxStyle}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className={`${inputBoxStyle} resize-none`}
                    required
                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-primary py-2 px-4 rounded-md cursor-pointer transition duration-300 font-bold"
                            >
                                SEND
                            </button>
                        </motion.form>

                        <div className="w-full flex justify-center items-center gap-3 mt-5">
                            <FacebookIcon size={20}/>
                            <TwitterIcon size={20}/>
                            <LinkedinIcon size={20}/>
                            <InstagramIcon size={20}/>
                        </div>
                    </div>
                </motion.div>

                {/* Google Map - Right Column */}
                <motion.div className="w-full lg:w-3/5"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.2, duration: 0.5}}
                >
                    <div className="h-96 min-h- lg:h-full rounded-lg shadow-md overflow-hidden">
                        <LocationMap
                            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                            markers={markers}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;

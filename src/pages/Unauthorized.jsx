import unauthorizedImage from "@/assets/unauthorized.svg";
import React from "react";
import { ShieldX, Home, HelpCircle } from "lucide-react";

const Unauthorized = () => {
    // Navigation handlers
    const navigateToHome = () => {
        window.location.href = "/";
    };

    const navigateToContact = () => {
        window.location.href = "/contact";
    };

    return (
        <div className="min-h-screen flex items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    {/* Left Column - Content */}
                    <div className="flex-1 space-y-8">
                        <div className="text-center lg:text-left">
                            <div className="flex items-center justify-center lg:justify-start mb-4">
                                <ShieldX className="h-12 w-12 text-red-500" />
                                <h1 className="ml-3 text-3xl font-bold text-gray-900">
                                    Unauthorized Access
                                </h1>
                            </div>
                            <p className="mt-2 text-xl text-gray-600">
                                You don&apos;t have permission to access this
                                admin area.
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Possible reasons:
                            </h2>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                        <span className="h-2 w-2 bg-primary rounded-full"></span>
                                    </span>
                                    Your account doesn&apos;t have administrator
                                    privileges
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                        <span className="h-2 w-2 bg-primary rounded-full"></span>
                                    </span>
                                    Your session may have expired
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                        <span className="h-2 w-2 bg-primary rounded-full"></span>
                                    </span>
                                    You might be trying to access a restricted
                                    area
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={navigateToHome}
                                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <Home className="mr-2 h-5 w-5" />
                                Return Home
                            </button>
                            <button
                                onClick={navigateToContact}
                                className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <HelpCircle className="mr-2 h-5 w-5" />
                                Get Help
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Illustration (hidden on mobile) */}
                    <div className="hidden lg:flex lg:flex-1 items-center justify-center mt-10 lg:mt-0">
                        <div className="relative w-full max-w-lg">
                            {/* <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div> */}
                            {/* <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div> */}
                            {/* <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}
                            <div className="relative">
                                <div className="w-96 h-96 mx-auto">
                                    <img
                                        src={unauthorizedImage}
                                        alt="Unauthorized Access"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;


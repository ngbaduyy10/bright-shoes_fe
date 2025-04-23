import React from "react";
import { FileQuestion, Home, Search } from "lucide-react";

const NotFound = () => {
    // Navigation handler for the home button
    const navigateToHome = () => {
        window.location.href = "/";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
                <div className="flex justify-center">
                    <FileQuestion className="h-24 w-24 text-primary" />
                </div>

                <h1 className="mt-6 text-6xl font-extrabold text-gray-900">
                    404
                </h1>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Page Not Found
                </h2>

                <p className="mt-4 text-lg text-gray-600">
                    Sorry, we couldn&apos;t find the page you&apos;re looking
                    for.
                </p>

                <div className="mt-8 bg-white shadow rounded-lg p-6 text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Possible reasons:
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                <span className="h-2 w-2 bg-primary rounded-full"></span>
                            </span>
                            The page may have been moved or deleted
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                <span className="h-2 w-2 bg-primary rounded-full"></span>
                            </span>
                            You might have typed the address incorrectly
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                <span className="h-2 w-2 bg-primary rounded-full"></span>
                            </span>
                            The link you followed may be broken
                        </li>
                        <li className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary-foreground flex items-center justify-center mr-2">
                                <span className="h-2 w-2 bg-primary rounded-full"></span>
                            </span>
                            You might not have permission to view this page
                        </li>
                    </ul>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={navigateToHome}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

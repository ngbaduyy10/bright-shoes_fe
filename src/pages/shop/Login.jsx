import { SignIn, useSignIn } from '@clerk/clerk-react';
import { LoaderCircle } from "lucide-react";

const Login = () => {
    const { isLoaded } = useSignIn()

    return (
        <div className="flex-center m-18">
            {isLoaded ? (
                <SignIn signUpUrl="/register" />
            ) : (
                <div className="animate-spin">
                    <LoaderCircle />
                </div>
            )}
        </div>
    );
}

export default Login;
import {SignUp, useSignUp} from "@clerk/clerk-react";
import {LoaderCircle} from "lucide-react";

const Register = () => {
    const { isLoaded } = useSignUp()

    return (
        <div className="flex-center m-18">
            {isLoaded ? (
                <SignUp signInUrl="/login" />
            ) : (
                <div className="animate-spin">
                    <LoaderCircle />
                </div>
            )}
        </div>
    )
}

export default Register;
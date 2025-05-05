import {SignUp, useSignUp} from "@clerk/clerk-react";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {motion} from "framer-motion";

const Register = () => {
    const { isLoaded } = useSignUp()

    return (
        <div className="flex-center m-18">
            {isLoaded ? (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                >
                    <SignUp signInUrl="/login" />
                </motion.div>
            ) : (
                <div>
                    <Skeleton className="w-82 h-18 mb-4"/>
                    <Skeleton className="w-82 h-36 mb-4"/>
                    <Skeleton className="w-82 h-58 mb-4"/>
                </div>
            )}
        </div>
    )
}

export default Register;
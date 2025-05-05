import { SignIn, useSignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import {Skeleton} from '@/components/ui/skeleton.jsx';

const Login = () => {
    const { isLoaded } = useSignIn()

    return (
        <div className="flex-center m-18">
            {isLoaded ? (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                >
                    <SignIn signUpUrl="/register"/>
                </motion.div>
            ) : (
                <div>
                    <Skeleton className="w-82 h-18 mb-4"/>
                    <Skeleton className="w-82 h-36 mb-4"/>
                    <Skeleton className="w-82 h-48 mb-4"/>
                </div>
            )}
        </div>
    );
}

export default Login;
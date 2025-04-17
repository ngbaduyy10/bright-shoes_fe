import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useNavigate} from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.jsx";
import {adminLogin} from "@/services/auth.service.js";
import {toast} from "sonner";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const AdminLogin = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const response = await adminLogin(data);
        if (response.success) {
            toast.success(response.message);
            navigate("/admin/user", { replace: true });
        } else {
            toast.error(response.message);
        }
    }

    return (
        <div className="h-screen flex-center bg-background">
            <div className="flex grid grid-cols-1 md:grid-cols-2 rounded-[30px] m-4 shadow-xl w-full md:max-w-[900px] h-[400px] bg-white">
                <div className="hidden md:block bg-primary p-8 rounded-l-[30px] rounded-r-[100px]">
                    <div className="h-full flex flex-col justify-center">
                        <h1 className="text-white mb-4 font-bold text-3xl">Welcome to Bright!</h1>
                        <p className="text-md text-white">To keep connected with us please sign in with your personal info.</p>
                        <p className="text-md text-white mb-4">Don&apos;t have an account. Please get back to homepage.</p>
                        <Button
                            className="cursor-pointer border border-white hover:bg-white hover:text-primary text-white w-fit"
                            onClick={() => navigate("/")}
                        >
                            Back to homepage
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-8 rounded-[30px]">
                    <h1 className="font-bold text-3xl">Sign In</h1>
                    <p className="text-md text-muted-foreground mb-4">Please sign in with your personal info.</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="gap-1">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage errors={form.formState.errors.email} className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="gap-1">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage errors={form.formState.errors.password} className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full cursor-pointer mt-2">Sign In</Button>
                        </form>
                    </Form>
                    <p className="text-sm text-muted-foreground mt-2 cursor-pointer hover:text-primary">Forgot password?</p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
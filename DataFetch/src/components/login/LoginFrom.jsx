import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLoginUserMutation } from "../../redux/feature/post-api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/feature/post-api/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser, { isLoading, isError, isSuccess }] = useLoginUserMutation()

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const payload = {
        email, password
    }
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(payload).unwrap();
            console.log(res);
            if (res.status === "success") {
                dispatch(setCredentials({
                    token: res.token,
                    user: "ishan" // 👈 use user object, not email string
                }));
                setPassword("")
                alert(`Login successfully`);
                return navigate("/");
            }
        } catch (error) {
            alert(error.data?.msg)
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-md">
                <CardContent className="p-6 space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                        Login to your account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative w-full">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    required
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className="pr-10" // add right padding for icon space
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            {
                                isLoading ? "loading..." : "Login"
                            }
                        </Button>
                    </form>
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-600 hover:underline">
                            Register
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;

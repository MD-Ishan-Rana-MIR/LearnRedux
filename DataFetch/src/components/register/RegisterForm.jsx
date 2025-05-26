import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRegistrationUserMutation } from "../../redux/feature/post-api/authApi";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [registerUser, { isLoading, error, isSuccess }] = useRegistrationUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email && !phone_number) {
            alert("Please provide at least an email or a phone number.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const payload = {
            name,
            email,
            phone_number,
            password,
        };

        try {
            const res = await registerUser(payload).unwrap();
            console.log(res)
            if (res.status === "success") {
                setName("")
                setEmail("")
                setPhoneNumber("")
                setPassword("")
                setConfirmPassword("")
                return navigate(`/otp-verify?email=${email}`)

            }
        } catch (err) {
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="pt-20 h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-md">
                <CardContent className="p-6 space-y-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800">
                        Create your account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email (optional if phone number provided)</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <Label htmlFor="phone_number">
                                Phone Number (optional if email provided)
                            </Label>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                type="tel"
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+1234567890"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <AiFillEyeInvisible size={20} />
                                    ) : (
                                        <AiFillEye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Label htmlFor="confirm_password">Confirm Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPassword ? (
                                        <AiFillEyeInvisible size={20} />
                                    ) : (
                                        <AiFillEye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error or Success Message */}
                        {error && (
                            <p className="text-red-500 text-sm">
                                {error?.data?.message || "Registration failed"}
                            </p>
                        )}
                        {isSuccess && (
                            <p className="text-green-600 text-sm">Registration successful!</p>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterForm;

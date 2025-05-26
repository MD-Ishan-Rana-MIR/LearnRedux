import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOtpVerifyMutation } from "../../redux/feature/post-api/authApi";

export default function OtpVerify() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParam] = useSearchParams();
    const userEmail = searchParam.get("email");

    useEffect(() => {
        if (userEmail) setEmail(userEmail);
    }, [userEmail]);
    const navigate = useNavigate();
    const [otpVerify, { isLoading }] = useOtpVerifyMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await otpVerify({ email, otp }).unwrap();
            setOtp("")
            console.log("OTP Verified:", res);
            navigate("/login")
            // You can redirect or show success message here
        } catch (error) {
            console.error("OTP Verification Failed:", error);
            setErrorMessage("Invalid OTP or email. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-md">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-center">OTP Verification</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="otp">OTP</Label>
                            <Input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="123456"
                                required
                            />
                        </div>

                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                        <Button type="submit" className="w-full">
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

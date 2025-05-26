// components/.jsx
import React from "react";
import { useGetProfileQuery } from "../../redux/feature/post-api/authApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const UserProfile = () => {
    const { data, isLoading, isError, error } = useGetProfileQuery();
    console.log(error)
    if (isLoading) {
        return <Skeleton className=" h-screen w-full max-w-md mx-auto mt-10" />;
    }

    if (isError) {
        return (
            <div className="max-w-md mx-auto mt-10">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error?.data?.message || "Could not fetch profile"}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardContent className="p-6 space-y-3">
                    <h2 className="text-xl font-semibold text-center">User Profile</h2>
                    <div><strong>Name:</strong> {data?.user?.name || "N/A"}</div>
                    <div><strong>Email:</strong> {data?.user?.email || "N/A"}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfile;

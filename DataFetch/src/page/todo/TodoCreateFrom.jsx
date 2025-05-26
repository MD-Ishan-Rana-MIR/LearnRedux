// src/pages/TodoCreateForm.jsx

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodoCreateApiMutation } from "../../redux/feature/todo-api/todoApi";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

const TodoCreateForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todoCreateApi, { isLoading }] = useTodoCreateApiMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return toast.error("Please enter todo title");
        }

        if (!description.trim()) {
            return toast.error("Please enter todo description");
        }

        try {
            const payload = { title, description };
            const res = await todoCreateApi(payload).unwrap();

            if (res) {
                toast.success("Todo uploaded successfully");
                setTimeout(() => {
                    setTitle("");
                    setDescription("");
                }, 300);
            }
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to upload todo";
            toast.error(errorMessage);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen bg-gray-50 px-4"
        >
            <Card className="w-full max-w-xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-600">Create a Todo</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <Input
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter todo title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <Textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description"
                                rows={4}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Uploading..." : "Submit Todo"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Toaster position="top-center" reverseOrder={false} />
        </motion.div>
    );
};

export default TodoCreateForm;

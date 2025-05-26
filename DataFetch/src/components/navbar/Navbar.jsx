// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-xl font-bold text-blue-600">MyLogo</Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-4 items-center relative" ref={profileRef}>
                        {
                            token ? (
                                <>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                                    >
                                        Profile
                                    </button>

                                    <AnimatePresence>
                                        {isProfileOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-12 right-0 bg-white border border-gray-200 rounded shadow-md w-48 z-10"
                                            >
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    👤 View Profile
                                                </Link>
                                                <Link
                                                    to="/create-todo"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    ✅ Create Todo
                                                </Link>
                                                <Link
                                                    to="/all-todos"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                >
                                                    📋 All Todos
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                                >
                                                    🚪 Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Login</Link>
                                    <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</Link>
                                </>
                            )
                        }
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                                viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
                    <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
                    <Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
                    <div className="pt-2 space-y-2">
                        {token ? (
                            <>
                                <Link to="/profile" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">Profile</Link>
                                <Link to="/create-task" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">Create Todo</Link>
                                <Link to="/all-todos" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">All Todos</Link>
                                <button onClick={handleLogout} className="block w-full px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-50 text-center">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block w-full mb-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-center">Login</Link>
                                <Link to="/register" className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

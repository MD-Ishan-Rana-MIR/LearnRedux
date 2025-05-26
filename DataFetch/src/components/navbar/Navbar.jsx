// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem("token");



    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-blue-600">MyLogo</Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {
                            token ? <>
                                <Link className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" to={"/profile"} > Profile  </Link>
                            </> :
                                <>
                                    <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">Login</Link>
                                </>
                        }
                        {
                            token ? <>
                                <Link className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" to={"/create-task"} > Create Task  </Link>
                            </> : <>
                                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</Link>
                            </>
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
                    <div className="pt-2">
                        <Link to="/login" className="block w-full mb-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 text-center">Login</Link>
                        <Link to="/register" className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center">Register</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

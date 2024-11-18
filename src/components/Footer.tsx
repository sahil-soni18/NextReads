import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black-800 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">About Us</h4>
                        <p className="text-sm">
                            We provide the best solutions for web development, design, and more. Let's work together to create something amazing!
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-white">About</a></li>
                            <li><a href="/services" className="hover:text-white">Services</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <p className="text-sm">Email: contact@yourwebsite.com</p>
                        <p className="text-sm">Phone: +123 456 7890</p>
                        <p className="text-sm">Location: Your City, Your Country</p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-6 pt-6 text-center">
                    <p className="text-sm">&copy; 2024 Your Website. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

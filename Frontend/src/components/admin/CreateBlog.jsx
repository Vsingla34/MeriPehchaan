import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../services/blog.service.js';
import toast from 'react-hot-toast';
import Header from '../layout/Navbar';
import SiteFooter from '../layout/Footer';
import { FileText, Image, Type, CheckSquare } from 'lucide-react';

const CreateBlog = () => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { title, content, excerpt } = formData;
        if (!title || !content || !excerpt) {
            toast.error("Title, Excerpt, and Content fields are required.");
            setLoading(false);
            return;
        }

        try {
            // Get token from local storage
            const userStorage = localStorage.getItem('u-');
            if (!userStorage) {
                toast.error("You are not authenticated.");
                navigate('/login');
                return;
            }
            const { token } = JSON.parse(userStorage);

            if (!token) {
                toast.error("Authentication token not found.");
                navigate('/login');
                return;
            }
            
            // Call the API service
            const response = await createBlog(formData, token);

            toast.success("Blog post created successfully!");
            setLoading(false);

            // Navigate to the new blog post
            navigate(`/blog/${response.data.blog.slug}`);

        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || "Failed to create blog post.";
            toast.error(message);
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-24 px-4">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Create New Blog Post</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <div className="relative">
                                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="Your blog post title"
                                    required
                                />
                            </div>
                        </div>

                        {/* Excerpt (Summary) */}
                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt (Short Summary)
                            </label>
                            <div className="relative">
                                <CheckSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    rows="3"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="A short summary for the blog card (max 200 chars)"
                                    maxLength="200"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL (Optional)
                            </label>
                            <div className="relative">
                                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                <textarea
                                    id="content"
                                    name="content"
                                    rows="12"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    placeholder="Write your blog post content here... You can use plain text. New lines will be preserved."
                                    required
                                ></textarea>
                            </div>
                             <p className="mt-2 text-xs text-gray-500">
                                Plain text only. Paragraphs will be automatically formatted on the blog page.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </button>
                    </form>
                </div>
            </div>
            <SiteFooter />
        </>
    );
};

export default CreateBlog;
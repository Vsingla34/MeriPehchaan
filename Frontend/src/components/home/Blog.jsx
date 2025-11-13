import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, AlertTriangle, PenTool, Plus } from 'lucide-react'; // Added Plus/PenTool icons
import { getAllBlogs } from "../../services/blog.service.js";
import Navbar from "../layout/Navbar.jsx";
import SiteFooter from '../layout/Footer.jsx';

// Card for individual blog posts
const BlogPostCard = ({ post }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
            <Link to={`/blog/${post.slug}`}>
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-56 object-cover" 
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/eeeeee/cccccc?text=Image+Failed'; e.target.onerror = null; }}
                />
            </Link>
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{formatDate(post.createdAt)}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 hover:text-emerald-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-700 mb-5 text-sm leading-relaxed">
                    {post.excerpt}
                </p>
                <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block bg-emerald-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

// Main Blog Page Component
const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // --- CHECK ADMIN STATUS ---
    const userString = localStorage.getItem("u-");
    const user = userString ? JSON.parse(userString) : null;
    const isAdmin = user && user.user && user.user.role === 'admin';

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await getAllBlogs();
                setPosts(response.data.blogs || []);
                setError('');
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError(err.response?.data?.message || "Could not fetch blog posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 md:pt-32 relative">
            
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Blog</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    News, stories, and insights from Meri Pehchaan.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row -mx-4">
                <div className="w-full px-4">
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
                        </div>
                    )}

                    {error && (
                        <div className="flex flex-col items-center text-center py-20 text-red-600">
                            <AlertTriangle className="h-12 w-12 mb-4" />
                            <h2 className="text-xl font-semibold">Failed to load posts</h2>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <h2 className="text-2xl font-semibold mb-2">No Posts Yet</h2>
                            <p>Check back soon for our latest news and stories!</p>
                        </div>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <BlogPostCard key={post._id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* --- FLOATING ADMIN CREATE BUTTON --- */}
            {isAdmin && (
                <Link
                    to="/admin/create-blog"
                    className="fixed bottom-8 right-8 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
                    title="Create New Blog Post"
                >
                    <Plus className="h-8 w-8" />
                    <span className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Create Post
                    </span>
                </Link>
            )}
        </div>
    );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
        <Navbar/>
        <main>
            <BlogPage />
        </main>
        <SiteFooter/>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Correct relative path: ../../services/blog.service.js
import { getBlogBySlug } from '../../services/blog.service.js'; 
import Header from '../layout/Navbar';
import SiteFooter from '../layout/Footer';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';

const BlogOverview = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await getBlogBySlug(slug);
                setBlog(response.data.blog);
                setError('');
            } catch (err) {
                setError(err.response?.data?.message || "Blog post not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50"><Loader2 className="h-12 w-12 animate-spin text-emerald-600" /></div>;
    if (error) return <><Header /><div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4"><h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1><p className="text-xl text-gray-700 mb-8">{error}</p><Link to="/blogs" className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700"><ArrowLeft className="mr-2 h-5 w-5" />Back to All Blogs</Link></div><SiteFooter /></>;
    if (!blog) return null;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <main className="py-24 md:py-32">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <Link to="/blogs" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-4"><ArrowLeft className="mr-2 h-5 w-5" />Back to All Blogs</Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{blog.title}</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-500">
                            <div className="flex items-center"><img src={blog.author.profilePic || 'https://i.ibb.co/3ywTZFTd/download.png'} alt={blog.author.fullname} className="h-8 w-8 rounded-full object-cover mr-2 border-2 border-emerald-100" /><span className="font-medium">{blog.author.fullname}</span></div>
                            <div className="flex items-center"><Calendar className="h-5 w-5 mr-2 text-emerald-600" /><span className="font-medium">{formatDate(blog.createdAt)}</span></div>
                        </div>
                    </div>
                    <img src={blog.imageUrl} alt={blog.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl mb-8" onError={(e) => { e.target.src = 'https://placehold.co/1200x600/eeeeee/cccccc?text=Image+Not+Found'; e.target.onerror = null; }} />
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                        <div className="prose prose-lg max-w-none prose-emerald" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                            {blog.content.split('\n').map((paragraph, index) => (<p key={index} className="mb-4 last:mb-0">{paragraph}</p>))}
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
};

export default BlogOverview;
import { Blog } from "../models/blog.model.js";

// Helper function to create a URL-friendly slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/[\s_]+/g, '-')     // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
};

/**
 * @desc    Create a new blog post
 * @route   POST /blog/create
 * @access  Private (Admin)
 */
export const createBlog = async (req, res) => {
    try {
        const { title, content, excerpt, imageUrl } = req.body;
        const author = req.user._id; // From authMiddleware

        if (!title || !content || !excerpt) {
            return res.status(400).send({
                success: false,
                message: "Title, content, and excerpt are required."
            });
        }

        // Generate slug
        let slug = generateSlug(title);
        
        // Check if slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            // If exists, add a unique suffix
            slug = `${slug}-${Date.now()}`;
        }

        const newBlog = new Blog({
            title,
            content,
            excerpt,
            slug,
            imageUrl: imageUrl || undefined, // Use default if not provided
            author
        });

        await newBlog.save();

        res.status(201).send({
            success: true,
            message: "Blog post created successfully",
            blog: newBlog
        });

    } catch (error) {
        console.log("Blog creation error:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
};

/**
 * @desc    Get all blog posts
 * @route   GET /blog/all
 * @access  Public
 */
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'fullname') // Get author's name
            .sort({ createdAt: -1 }); // Show newest first

        res.status(200).send({
            success: true,
            count: blogs.length,
            blogs
        });
    } catch (error) {
        console.log("Get all blogs error:", error);
        res.status(500).send({
            success: false,
            message: "Failed to fetch blogs"
        });
    }
};

/**
 * @desc    Get a single blog post by its slug
 * @route   GET /blog/:slug
 * @access  Public
 */
export const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug })
            .populate('author', 'fullname profilePic'); // Get author details

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog post not found"
            });
        }

        res.status(200).send({
            success: true,
            blog
        });
    } catch (error) {
        console.log("Get single blog error:", error);
        res.status(500).send({
            success: false,
            message: "Failed to fetch blog post"
        });
    }
};
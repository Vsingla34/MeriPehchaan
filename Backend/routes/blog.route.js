import express from 'express';
import { createBlog, getAllBlogs, getBlogBySlug } from '../controllers/blog.controller.js';
import { authMiddleware, isAdmin } from '../middlewares/auth.middleware.js';

const blogRoute = express.Router();

// PUBLIC ROUTES
blogRoute.get('/blog/all', getAllBlogs);
blogRoute.get('/blog/:slug', getBlogBySlug);

// ADMIN ONLY ROUTES
// Protect the 'create' route. Must be logged in (authMiddleware) AND be an admin (isAdmin).
blogRoute.post('/blog/create', authMiddleware, isAdmin, createBlog);

// You can add update and delete routes here later
// blogRoute.put('/blog/:id', authMiddleware, isAdmin, updateBlog);
// blogRoute.delete('/blog/:id', authMiddleware, isAdmin, deleteBlog);

export { blogRoute };
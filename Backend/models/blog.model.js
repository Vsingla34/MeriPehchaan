import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    // A short summary for the blog card
    excerpt: {
        type: String,
        required: true,
        maxLength: 200
    },
    // URL-friendly version of the title
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    imageUrl: {
        type: String,
        default: 'https://placehold.co/600x400/eeeeee/cccccc?text=Blog+Post'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // References the 'user' model
        required: true
    }
}, { timestamps: true });

export const Blog = mongoose.model('blog', blogSchema);
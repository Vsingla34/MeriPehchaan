import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;


const getAllBlogs = () => {
    return axios.get(`${url}/blog/all`);
};


const getBlogBySlug = (slug) => {
    return axios.get(`${url}/blog/${slug}`);
};


const createBlog = (blogData, token) => {
    return axios.post(`${url}/blog/create`, blogData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export { getAllBlogs, getBlogBySlug, createBlog };
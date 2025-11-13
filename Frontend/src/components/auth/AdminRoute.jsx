import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * A protected route component that only allows access for users
 * with the 'admin' role.
 */
const AdminRoute = () => {
    const userStorage = localStorage.getItem('u-');
    let user = null;

    if (userStorage) {
        try {
            user = JSON.parse(userStorage);
        } catch (e) {
            console.error("Failed to parse user data from storage", e);
            localStorage.removeItem('u-'); // Clear corrupted data
        }
    }

    // Check if user is logged in AND is an admin
    const isAdmin = user && user.user && user.user.role === 'admin';

    if (!isAdmin) {
        // If not an admin, redirect to the homepage
        // You could also redirect to '/login'
        return <Navigate to="/" replace />;
    }

    // If they are an admin, render the child component
    // (e.g., the <CreateBlog /> page)
    return <Outlet />;
};

export default AdminRoute;
import JWT from "jsonwebtoken";
import { User } from "../models/user.model.js";

/**
 * Verifies JWT token and attaches user to req.
 */
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JWT.verify(token, process.env.JWT_KEY);
        
        // Find user by ID from token, but exclude the password
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid token. User not found."
            });
        }
        
        // Attach user object to the request
        req.user = user; 
        next();
    } catch (error) {
        console.log("Token verification error:", error);
        return res.status(400).send({
            success: false,
            message: "Invalid token."
        });
    }
};

/**
 * Checks if the attached user is an admin.
 * This middleware MUST run *after* authMiddleware.
 */
export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send({
            success: false,
            message: "Forbidden. Admin access required."
        });
    }
    next();
};
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // --- Add logging to verify this middleware is hit ---
    console.log('Protect Middleware: Checking Authorization Header...');

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log('Protect Middleware: Token extracted:', token); // Should be 'undefined' for new users

            // FIX 1: Correct the typo from JWT_SECRECT to JWT_SECRET
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Protect Middleware: Token decoded:', decodedToken);

            req.user = await User.findById(decodedToken.id).select("-password");
            console.log('Protect Middleware: User found from DB:', req.user ? req.user._id : 'None');

            if (!req.user) {
                console.log('Protect Middleware: User not found in DB after decoding token.');
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            console.log('Protect Middleware: User authenticated. Proceeding to next.');
            next(); // Proceed to the next middleware or route handler

        } catch (err) {
            // FIX 2: Send a response and throw an error inside the catch block
            console.error('Protect Middleware: Token verification failed or error:', err.message); // Log the specific error message
            res.status(401); // Set unauthorized status
            throw new Error("Not authorized, token failed or invalid"); // Throw to be caught by asyncHandler
        }
    } else {
        // FIX 3: Ensure this block is hit if no valid token is provided
        console.log('Protect Middleware: No token found in authorization header or invalid format.');
        res.status(401); // Set unauthorized status
        throw new Error("Not authorized, no token"); // Throw to be caught by asyncHandler
    }
});

module.exports = protect;
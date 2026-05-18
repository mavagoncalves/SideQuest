import { registerUser, loginUser } from '../services/auth.service.js';
import { signToken } from '../utils/jwt.js';

export const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role } = req.body;

        // Basic validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: "Email, password, firstName, and lastName are required" });
        }

        // Let service handle creating the user and hashing the password
        const user = await registerUser(email, password, firstName, lastName, role);

        // Let the helper generate the JWT
        const token = signToken(user.id);

        // Send success response to frontend
        res.status(201).json({
            token,
            user: { 
                id: user.id, 
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(400).json({ error: "Could not create account. Email might already be in use." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Let the service handle finding the user and checking the hash
        const user = await loginUser(email, password);

        // Let the helper generate the JWT
        const token = signToken(user.id);

        // Send success response to frontend
        res.json({
            token,
            user: { 
                id: user.id, 
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(401).json({ error: "Invalid email or password" });
    }
};
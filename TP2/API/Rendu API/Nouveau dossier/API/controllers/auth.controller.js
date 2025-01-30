import { authenticate, register } from '../services/auth.service.js';
import { validationResult } from 'express-validator';

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const token = await authenticate(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;

    try {
        const newUser = await register(userData);
        res.json({ success: true, data: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
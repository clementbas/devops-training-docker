import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../db.js';

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Utilisez une variable d'environnement pour la clé secrète

/**
 * Authenticates a user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {string} - The JWT token
 */
export const authenticate = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
    return token;
};

/**
 * Registers a new user
 * @param {object} userData - The data of the user to register
 * @returns {object} - The created user object
 */
export const register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const newUser = await prisma.user.create({
        data: {
            ...userData,
            password: hashedPassword
        }
    });
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

/**
 * Verifies a JWT token
 * @param {string} token - The JWT token
 * @returns {object} - The decoded token
 */
export const verifyToken = (token) => {
    return jwt.verify(token, secret);
};
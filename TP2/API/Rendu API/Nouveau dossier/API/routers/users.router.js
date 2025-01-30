import express from 'express';
import { getUsers, getUserById, getUserByEmail, deleteUserById, createUser, updateUser } from '../controllers/users.controller.js'
import { authenticateJWT } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/',authenticateJWT, isAdmin, getUsers) // Will match GET /users
router.get('/:id',authenticateJWT, isAdmin, getUserById) // Will match GET /users/:id
router.get('/email/:email',authenticateJWT, isAdmin, getUserByEmail); // New route to get a user by email
router.delete('/:id',authenticateJWT, deleteUserById) // Will match DELETE /users/:id
router.post('/',authenticateJWT, isAdmin, createUser) // Will match POST /users
router.put('/:id',authenticateJWT, updateUser); // Nouvelle route pour mettre à jour un utilisateur

// Export the router to be used on the app
export default router
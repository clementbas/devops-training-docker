import express from 'express';
import {
    getCategories,
    getCategoryById,
    getCategoryByName,
    deleteCategoryById,
    createCategory,
    updateCategory
} from '../controllers/category.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route pour récupérer toutes les catégories
router.get('/', authenticateJWT, getCategories);

// Route pour récupérer une catégorie par son ID
router.get('/:id', authenticateJWT, getCategoryById);

// Route pour récupérer une catégorie par son nom
router.get('/name/:name', authenticateJWT, getCategoryByName);

// Route pour supprimer une catégorie par son ID
router.delete('/:id', authenticateJWT, isAdmin, deleteCategoryById);

// Route pour créer une nouvelle catégorie
router.post('/', authenticateJWT, isAdmin, createCategory);

// Route pour mettre à jour une catégorie par son ID
router.put('/:id', authenticateJWT, isAdmin, updateCategory);

export default router;
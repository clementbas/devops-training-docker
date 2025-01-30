import express from 'express';
import { 
    getReasons,
    getReasonById, 
    getReasonByLabel, 
    deleteReasonById, 
    createReason, 
    updateReason 
} from '../controllers/reason.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route pour récupérer toutes les raisons
router.get('/',authenticateJWT, isAdmin, getReasons);

// Route pour récupérer une raison par son ID
router.get('/:id',authenticateJWT, isAdmin, getReasonById);

// Route pour récupérer une raison par son label
router.get('/label/:label',authenticateJWT, isAdmin, getReasonByLabel);

// Route pour supprimer une raison par son ID
router.delete('/:id',authenticateJWT, isAdmin, deleteReasonById);

// Route pour créer une nouvelle raison
router.post('/',authenticateJWT, isAdmin, createReason);

// Route pour mettre à jour une raison par son ID
router.put('/:id',authenticateJWT, isAdmin, updateReason);

export default router;
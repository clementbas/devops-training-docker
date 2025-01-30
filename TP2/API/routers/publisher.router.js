import express from 'express';
import { 
    getPublishers,
    getPublisherById, 
    getPublisherByName, 
    deletePublisherById, 
    createPublisher, 
    updatePublisher 
} from '../controllers/publisher.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route pour récupérer tous les éditeurs
router.get('/',authenticateJWT, getPublishers);

// Route pour récupérer un éditeur par son ID
router.get('/:id',authenticateJWT, getPublisherById);

// Route pour récupérer un éditeur par son nom
router.get('/name/:name',authenticateJWT, getPublisherByName);

// Route pour supprimer un éditeur par son ID
router.delete('/:id',authenticateJWT, isAdmin, deletePublisherById);

// Route pour créer un nouvel éditeur
router.post('/',authenticateJWT, isAdmin, createPublisher);

// Route pour mettre à jour un éditeur par son ID
router.put('/:id',authenticateJWT, isAdmin, updatePublisher);

export default router;
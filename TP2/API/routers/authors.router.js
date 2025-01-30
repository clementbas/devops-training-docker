import express from 'express';
import { 
    getAuthors, 
    getAuthorById, 
    getAuthorByFullnameController, 
    deleteAuthorById, 
    createAuthor, 
    updateAuthor 
} from '../controllers/authors.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route pour récupérer tous les auteurs
router.get('/',authenticateJWT, getAuthors);

// Route pour récupérer un auteur par son ID
router.get('/:id',authenticateJWT, getAuthorById);

// Route pour récupérer un auteur par son fullname
router.get('/fullname/:fullname',authenticateJWT, getAuthorByFullnameController);

// Route pour supprimer un auteur par son ID
router.delete('/:id',authenticateJWT, isAdmin, deleteAuthorById);

// Route pour créer un nouvel auteur
router.post('/',authenticateJWT, isAdmin, createAuthor);

// Route pour mettre à jour un auteur par son ID
router.put('/:id',authenticateJWT, isAdmin, updateAuthor);

export default router;

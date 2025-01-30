import express from 'express';
import { getBooks, getBookById, getBookByTitle, deleteBookById, createBook, updateBook } from '../controllers/books.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

router.get('/', authenticateJWT, getBooks)
router.get('/:id',authenticateJWT, getBookById)
router.get('/title/:title',authenticateJWT, getBookByTitle)
router.delete('/:id',authenticateJWT, isAdmin, deleteBookById)
router.post('/',authenticateJWT, isAdmin, createBook)
router.put('/:id',authenticateJWT, isAdmin, updateBook)

export default router;
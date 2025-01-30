import express from 'express';
import { getBorrows, getBorrowById, getBorrowByUserId, getBorrowByBookId, getBorrowByStatus, createBorrow, updateBorrow, deleteBorrow} from '../controllers/borrow.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route to get all borrows
router.get('/', authenticateJWT, isAdmin, getBorrows);

// Route to get a borrow by its id
router.get('/:id', authenticateJWT, isAdmin, getBorrowById);

// Route to get a borrow by its user id
router.get('/user/:userId', authenticateJWT, isAdmin, getBorrowByUserId);

// Route to get a borrow by its book id
router.get('/book/:bookId', authenticateJWT, isAdmin, getBorrowByBookId);

// Route to get a borrow by its status
router.get('/status/:status', authenticateJWT, isAdmin, getBorrowByStatus);

// Route to create a borrow
router.post('/', authenticateJWT, isAdmin, createBorrow)

// Route to update a borrow
router.put('/:id', authenticateJWT, isAdmin, updateBorrow)

// Route to delete a borrow
router.delete('/:id', authenticateJWT, isAdmin, deleteBorrow)

export default router;
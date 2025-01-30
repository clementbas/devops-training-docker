// API/routers/stats.router.js
import express from 'express';
import { getBorrowedBooksStats,
    getReturnedBooksStats,
    getPendingBillsStats,
    getPaidBillsStats,
    getPendingReservationsStats
 } from '../controllers/stats.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route to get the count of borrowed books
router.get('/borrowed-books', authenticateJWT, isAdmin, getBorrowedBooksStats);

// Route to get the count of returned books
router.get('/returned-books', authenticateJWT, isAdmin, getReturnedBooksStats);

// Route to get the count of pending bills
router.get('/pending-bills', authenticateJWT, isAdmin, getPendingBillsStats);

// Route to get the count of paid bills
router.get('/paid-bills', authenticateJWT, isAdmin, getPaidBillsStats);

// Route to get the count of pending reservations for a specific book
router.get('/pending-reservations/:bookId', authenticateJWT, isAdmin, getPendingReservationsStats);

export default router;
import express from 'express';
import { getReservations, getReservationById, getReservationByUserId, getReservationByBookId, getReservationByStatus, createReservation, createReservationForUser, acceptReservationUser} from '../controllers/reservation.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route to get all reservations
router.get('/', authenticateJWT, isAdmin, getReservations);

// Route to get a reservation by its id
router.get('/:id', authenticateJWT, isAdmin, getReservationById);

// Route to get a reservation by its user id
router.get('/user/:userId', authenticateJWT, isAdmin, getReservationByUserId);

// Route to get a reservation by its book id
router.get('/book/:bookId', authenticateJWT, isAdmin, getReservationByBookId);

// Route to get a reservation by its status
router.get('/status/:status', authenticateJWT, isAdmin, getReservationByStatus);

// Route to create a reservation
router.post('/', authenticateJWT, isAdmin, createReservation)

// Route to create a reservation for the logged in user
router.post('/me', authenticateJWT, createReservationForUser);

// Route to accept a reservation
router.put('/accept/:id', authenticateJWT, isAdmin, acceptReservationUser)

export default router;
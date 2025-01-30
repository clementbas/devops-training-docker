import express from 'express';
import { 
    getBills,
    getBillById,
    getBillByUserId,
    getBillByReasonId,
    getBillByStatus,
    deleteBillById,
    createBill,
    updateBill
} from '../controllers/bill.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/admin.middleware.js';

const router = express.Router();

// Route to get all bills
router.get('/', authenticateJWT, isAdmin, getBills);

// Route to get a bill by its ID
router.get('/:id', authenticateJWT, isAdmin, getBillById);

// Route to get a bill by its user ID
router.get('/user/:userId', authenticateJWT, isAdmin, getBillByUserId);

// Route to get a bill by its reason ID
router.get('/reason/:reasonId', authenticateJWT, isAdmin, getBillByReasonId);

// Route to get a bill by its status
router.get('/status/:status', authenticateJWT, isAdmin, getBillByStatus);

// Route to delete a bill by its ID
router.delete('/:id', authenticateJWT, isAdmin, deleteBillById);

// Route to create a new bill
router.post('/', authenticateJWT, isAdmin, createBill);

// Route to update a bill by its ID
router.put('/:id', authenticateJWT, isAdmin, updateBill);

export default router;

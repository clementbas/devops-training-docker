import {
    getAll,
    getById,
    getByUserId,
    getByReasonId,
    getByStatus,
    create,
    update,
    deleteById
} from '../services/bill.service.js';
import jwt from 'jsonwebtoken';

export const getBills = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
}

export const getBillById = async (req, res) => {
    try {
        const bill = await getById(parseInt(req.params.id));

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }

        res.json({
            success: true,
            data: bill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving bill',
            errors: error.message
        });
    }
};

export const getBillByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const bill = await getByUserId(parseInt(userId));

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found for the given user'
            });
        }

        res.json({
            success: true,
            data: bill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving bill',
            errors: error.message
        });
    }
}

export const getBillByReasonId = async (req, res) => {
    const { reasonId } = req.params;

    try {
        const bill = await getByReasonId(parseInt(reasonId));

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found for the given reason'
            });
        }

        res.json({
            success: true,
            data: bill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving bill',
            errors: error.message
        });
    }
}

export const getBillByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const bill = await getByStatus(status);

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found for the given status'
            });
        }

        res.json({
            success: true,
            data: bill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving bill',
            errors: error.message
        });
    }
}

export const createBill = async (req, res, next) => {
    const billData = req.body;

    try {
        const newBill = await create(billData);
        res.status(201).json({
            success: true,
            data: newBill
        });
    } catch (e) {
        next(e);
    }
}

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const updatedBill = req.body;

    try {
        const bill = await getById(parseInt(id));
        if (!bill) {
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            });
        }

        const updatedBillData = await update(parseInt(id), updatedBill);

        res.json({
            success: true,
            message: 'Bill updated successfully',
            data: updatedBillData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating bill',
            errors: error.message
        });
    }
}

export const deleteBillById = async (req, res) => {
    const hasBeenDeleted = await deleteById(parseInt(req.params.id));

    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Bill not found'
        });
    }

    res.json({
        success: true,
        message: 'Bill deleted successfully'
    });
}
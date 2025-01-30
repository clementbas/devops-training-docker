// API/controllers/stats.controller.js
import { getBorrowedBooksCount,
    getReturnedBooksCount
    , getPendingBillsCount
    , getPaidBillsCount
    , getPendingReservationsCount
 } from '../services/stats.service.js';

export const getBorrowedBooksStats = async (req, res) => {
    try {
        const count = await getBorrowedBooksCount();
        res.json({
            success: true,
            data: { borrowedBooksCount: count }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving borrowed books count',
            errors: error.message
        });
    }
};

export const getReturnedBooksStats = async (req, res) => {
    try {
        const count = await getReturnedBooksCount();
        res.json({
            success: true,
            data: { borrowedBooksCount: count }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving returned books count',
            errors: error.message
        });
    }
};

export const getPendingBillsStats = async (req, res) => {
    try {
        const count = await getPendingBillsCount();
        res.json({
            success: true,
            data: { pendingBillsCount: count }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving pending bills count',
            errors: error.message
        });
    }
};

export const getPaidBillsStats = async (req, res) => {
    try {
        const count = await getPaidBillsCount();
        res.json({
            success: true,
            data: { pendingBillsCount: count }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving paid bills count',
            errors: error.message
        });
    }
};

export const getPendingReservationsStats = async (req, res) => {
    const { bookId } = req.params;
    try {
        const count = await getPendingReservationsCount(bookId);
        res.json({
            success: true,
            data: { pendingReservationsCount: count }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving pending reservations count',
            errors: error.message
        });
    }
};
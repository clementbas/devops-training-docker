import {
    getAll,
    getById,
    getByUserId,
    getByBookId,
    getByStatus,
    create,
    update,
    deleteById
} from '../services/borrow.service.js';

export const getBorrows = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
}

export const getBorrowById = async (req, res) => {
    const borrow = await getById(parseInt(req.params.id));

    if (!borrow) {
        return res.status(404).json({
            success: false,
            message: 'Borrow not found'
        });
    }

    res.json({
        success: true,
        data: borrow
    });
}

export const getBorrowByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const borrow = await getByUserId(parseInt(userId));

        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: 'Borrow not found for the given user'
            });
        }

        res.json({
            success: true,
            data: borrow
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving borrow',
            errors: error.message
        });
    }
}

export const getBorrowByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const borrow = await getByBookId(parseInt(bookId));

        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: 'Borrow not found for the given book'
            });
        }

        res.json({
            success: true,
            data: borrow
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving borrow',
            errors: error.message
        });
    }
}

export const getBorrowByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const borrow = await getByStatus(status);

        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: 'Borrow not found for the given status'
            });
        }

        res.json({
            success: true,
            data: borrow
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving borrow',
            errors: error.message
        });
    }
}

export const createBorrow = async (req, res, next) => {
    const borrowData = req.body;

    try {
        const newBorrow = await create(borrowData);
        res.status(201).json({
            success: true,
            data: newBorrow
        });
    } catch(e) {
        next(e);
    }
}

export const updateBorrow = async (req, res, next) => {
    const { id } = req.params;
    const borrowData = req.body;

    try {
        const updatedBorrow = await update(parseInt(id), borrowData);
        res.json({
            success: true,
            data: updatedBorrow
        });
    } catch(e) {
        next(e);
    }
}

export const deleteBorrow = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await deleteById(parseInt(id));
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Borrow not found'
            });
        }

        res.json({
            success: true,
            message: 'Borrow deleted'
        });
    } catch(e) {
        res.status(400).json({
            success: false,
            message: 'Error deleting borrow',
            errors: e.message
        });
    }
}
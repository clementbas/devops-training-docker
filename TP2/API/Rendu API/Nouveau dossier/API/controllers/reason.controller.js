import {
    getAll,
    getById,
    getByLabel,
    create,
    update,
    deleteById
} from '../services/reason.service.js';

export const getReasons = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
};

export const getReasonById = async (req, res) => {
    const reason = await getById(parseInt(req.params.id));

    if (!reason) {
        return res.status(404).json({
            success: false,
            message: 'Reason not found'
        });
    }

    res.json({
        success: true,
        data: reason
    });
};

export const getReasonByLabel = async (req, res) => {
    const { label } = req.params;

    try {
        const reason = await getByLabel(label);

        if (!reason) {
            return res.status(404).json({
                success: false,
                message: 'Reason not found'
            });
        }

        res.json({
            success: true,
            data: reason
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving reason',
            errors: error.message
        });
    }
};

export const createReason = async (req, res, next) => {
    const reasonData = req.body;

    try {
        const newReason = await create(reasonData);

        res.status(201).json({
            success: true,
            data: newReason
        });
    } catch (e) {
        next (e);
    }
};

export const updateReason = async (req, res) => {
    const { id } = req.params;
    const updatedReason = req.body;

    try {
        const reason = await getById(parseInt(id));

        if (!reason) {
            return res.status(404).json({
                success: false,
                message: 'Reason not found'
            });
        }

        const updatedReasonData = await update(parseInt(id), updatedReason);
        res.json({
            success: true,
            message: 'Reason updated successfully',
            data: updatedReasonData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating reason',
            errors: error.message
        });
    }
}

export const deleteReasonById = async (req, res) => {
    const hasBeenDeleted = await deleteById(parseInt(req.params.id));

    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Reason not found'
        });
    }

    res.json({
        success: true,
        message: 'Reason deleted successfully'
    });
}
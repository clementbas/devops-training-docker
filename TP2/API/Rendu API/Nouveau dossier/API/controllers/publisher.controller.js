import {
    getAll,
    getById,
    getByName,
    create,
    update,
    deleteById
} from '../services/publisher.service.js';

export const getPublishers = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
};

export const getPublisherById = async (req, res) => {
    const publisher = await getById(parseInt(req.params.id));

    if (!publisher) {
        return res.status(404).json({
            success: false,
            message: 'Publisher not found'
        });
    }

    res.json({
        success: true,
        data: publisher
    });
};

export const getPublisherByName = async (req, res) => {
    const { name } = req.params;

    try {
        const publisher = await getByName(name);

        if (!publisher) {
            return res.status(404).json({
                success: false,
                message: 'Publisher not found'
            });
        }

        res.json({
            success: true,
            data: publisher
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving publisher',
            errors: error.message
        });
    }
};

export const createPublisher = async (req, res, next) => {
    const publisherData = req.body;

    try {
        const newPublisher = await create(publisherData);
        res.status(201).json({
            success: true,
            data: newPublisher
        });
    } catch (e) {
        next (e);
    }
};

export const updatePublisher = async (req, res) => {
    const { id } = req.params;
    const updatedPublisher = req.body;

    try {
        const publisher = await getById(parseInt(id));

        if (!publisher) {
            return res.status(404).json({
                success: false,
                message: 'Publisher not found'
            });
        }

        const updatedPublisherData = await update(parseInt(id), updatedPublisher);
        res.json({
            success: true,
            message: 'Publisher updated successfully',
            data: updatedPublisherData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating publisher',
            errors: error.message
        });
    }
}

export const deletePublisherById = async (req, res) => {
    const hasBeenDeleted = await deleteById(parseInt(req.params.id));

    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Publisher not found'
        });
    }

    res.json({
        success: true,
        message: 'Publisher deleted successfully'
    });
}
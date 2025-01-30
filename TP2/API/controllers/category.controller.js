import {
    getAll,
    getById,
    getByName,
    create,
    update,
    deleteById
} from '../services/category.service.js';

export const getCategories = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
};

export const getCategoryById = async (req, res) => {
    const category = await getById(parseInt(req.params.id));

    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }

    res.json({
        success: true,
        data: category
    });
};

export const getCategoryByName = async (req, res) => {
    const { name } = req.params;

    try {
        const category = await getByName(name);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving category',
            errors: error.message
        });
    }
}

export const createCategory = async (req, res, next) => {
    const categoryData = req.body;

    try {
        const newCategory = await create(categoryData);
        res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (e) {
        next(e);
    }
};

export const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const updatedCategory = req.body;

    try {
        const category = await getById(parseInt(id));

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        const updatedCategoryData = await update(parseInt(id), updatedCategory);
        res.json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategoryData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating category',
            errors: error.message
        });
    }
};

export const deleteCategoryById = async (req, res) => {
    const hasBennDeleted = await deleteById(parseInt(req.params.id));

    if (!hasBennDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Category not found'
        });
    }

    res.json({
        success: true,
        message: 'Category deleted successfully'
    });
}
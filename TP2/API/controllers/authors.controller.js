import { 
    getAll, 
    getById, 
    getAuthorByFullname as getAuthorByFullnameService, 
    deleteById, 
    create, 
    update 
} from '../services/authors.service.js';

export const getAuthors = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
};

export const getAuthorById = async (req, res) => {
    const author = await getById(parseInt(req.params.id));

    if (!author) {
        return res.status(404).json({
            success: false,
            message: 'Author not found'
        });
    }

    res.json({
        success: true,
        data: author
    });
};

export const getAuthorByFullnameController = async (req, res) => {
    const { fullname } = req.params;

    try {
        const author = await getAuthorByFullnameService(fullname);

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        res.json({
            success: true,
            data: author
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving author',
            errors: error.message
        });
    }
};

export const deleteAuthorById = async (req, res) => {
    const hasBeenDeleted = await deleteById(parseInt(req.params.id));

    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Author not found'
        });
    }

    res.json({
        success: true,
        message: 'Author deleted successfully'
    });
};

export const createAuthor = async (req, res, next) => {
    const authorData = req.body;

    try {
        const newAuthor = await create(authorData);
        res.json({
            success: true,
            data: newAuthor
        });
    } catch (e) {
        next(e);
    }
};

export const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const updatedAuthor = req.body;

    try {
        const author = await getById(parseInt(id));

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        const updatedAuthorData = await update(parseInt(id), updatedAuthor);

        res.json({
            success: true,
            message: 'Author updated successfully',
            data: updatedAuthorData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating author',
            errors: error.message
        });
    }
};

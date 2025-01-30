import { getAllBooks, getBookById as getBookByIdService, getBookByTitle as getBookByTitleService, deleteById, create, update } from '../services/books.service.js';

export const getBooks = async (req, res) => {
    const data = await getAllBooks(req.query.sortBy, req.query.sortDir);
    res.json({
        success: true,
        data
    });
};

export const getBookById = async (req, res) => {
    const book = await getBookByIdService(parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }

    return res.json({
        success: true,
        data: book
    });
};

export const getBookByTitle = async (req, res) => {
    const { title } = req.params;

    const book = await getBookByTitleService(title);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }

    res.json({
        success: true,
        data: book
    });
};

export const deleteBookById = async (req, res) => {
    const hasBeenDeleted = await deleteById(parseInt(req.params.id));
    if (!hasBeenDeleted) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }

    res.json({
        success: true,
        message: 'Book deleted successfully'
    });
};

export const createBook = async (req, res, next) => {
    const bookData = req.body;
    try {
        const newBook = await create(bookData);
        res.json({
            success: true,
            data: newBook
        });
    } catch (e) {
        next(e);
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;

    try {
        const book = await getBookByIdService(parseInt(id));
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        const updatedBookData = await update(parseInt(id), updatedBook);

        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBookData
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating book',
            errors: error.message
        });
    }
};
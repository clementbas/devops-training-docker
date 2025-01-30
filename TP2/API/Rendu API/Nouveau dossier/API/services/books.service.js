import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of users
 */
export const getAllBooks = async (sortBy, sortDirection) => {
    let option = {
        select: {
            id: true,
            title: true,
            publication: true,
            description: true,
            note: true,
            comments: true,
            borrow: true,
            category: true,
            author: true,
            publisher: true,
            reservations: true
        }
    };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc';
        option.orderBy = {
            [sortBy]: sortDirection
        };
    }
    return await prisma.books.findMany(option);
};

/**
 * Returns a single book by its id
 * @param {number} id - The id of the book to get
 * @returns {object} - The book object or null if not found
 */
export const getBookById = async (id) => {
    return await prisma.books.findUnique({
        select: {
            id: true,
            title: true,
            publication: true,
            description: true,
            note: true,
            comments: true,
            borrow: true,
            category: true,
            author: true,
            publisher: true,
            reservations: true
        },
        where: {
            id
        }
    });
};

/**
 * Returns a single book by its title
 * @param {string} title - The title of the book to get
 * @returns {object} - The book object or null if not found
 */
export const getBookByTitle = async (title) => {
    return await prisma.books.findUnique({
        where: { title },

        select: {
            id: true,
            title: true,
            publication: true,
            description: true,
            note: true,
            comments: true,
            borrow: true,
            category: true,
            author: true,
            publisher: true,
            reservations: true
        },
    });
};

/**
 * Deletes a book by its id
 * @param {number} id - The id of the book to delete
 * @returns {boolean} - True if the book was deleted, false otherwise
 */
export const deleteById = async (id) => {
    const book = await getBookById(id);
    if (!book) {
        return false;
    }
    await prisma.books.delete({
        where: { id }
    });
    return true;
};

/**
 * Creates a new book
 * @param {object} bookData - The data of the book to create
 * @returns {object} - The created book object
 */
export const create = async (bookData) => {
    return await prisma.books.create({
        data: {
            title: bookData.title,
            publication: bookData.publication,
            description: bookData.description,
            category: {
                connect: { id: bookData.id_category } // Connexion à une catégorie existante
            },
            author: {
                connect: { id: bookData.id_author } // Connexion à un auteur existant
            },
            publisher: {
                connect: { id: bookData.id_publisher } // Connexion à un éditeur existant
            }
        }
    });
};

/**
 * Updates a book by its id
 * @param {number} id - The id of the book to update
 * @param {object} bookData - The data to update
 * @returns {object} - The updated book object or null if not found
 */
export const update = async (id, bookData) => {
    const { category, author, publisher, ...rest } = bookData;
    return await prisma.books.update({
        where: { id },
        data: {
            ...rest,
            category: {
                connect: { id: category }
            },
            author: {
                connect: { id: author }
            },
            publisher: {
                connect: { id: publisher }
            }
        }
    });
};
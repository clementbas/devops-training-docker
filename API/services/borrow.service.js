import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of borrow records
 */

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            borrow_date: true,
            return_date: true,
            due_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            books: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc';
        options.orderBy = {
            [sortBy]: sortDirection
        };
    }
    return await prisma.borrow.findMany(options);
}

/**
 * Returns a single borrow record by its id
 * @param {number} id - The id of the borrow record to get
 * @returns {object} - The borrow record object or null if not found
 */

export const getById = async (id) => {
    return await prisma.borrow.findUnique({
        where: { id: id },
        select: {
            id: true,
            borrow_date: true,
            return_date: true,
            due_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            books: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });
}

/**
 * Returns all borrow for a user
 * @param {number} id - The id of the user
 * @returns {Array} - An array of borrow records
 */

export const getByUserId = async (id) => {
    return await prisma.borrow.findMany({
        where: { id_user: id },
        select: {
            id: true,
            borrow_date: true,
            return_date: true,
            due_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            books: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });
}

/**
 * Returns all borrow for a book
 * @param {number} bookId - The id of the book
 * @returns {Array} - An array of borrow records
 */

export const getByBookId = async (bookId) => {
    return await prisma.borrow.findMany({
        where: {
            books: {
                some: {
                    id: bookId
                }
            }
        },
        select: {
            id: true,
            borrow_date: true,
            return_date: true,
            due_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            books: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });
}

/**
 * Returns borrow for a status
 * @param {string} status - The status
 * @returns {Array} - An array of borrow records
 */

export const getByStatus = async (status) => {
    return await prisma.borrow.findMany({
        where: { status },
        select: {
            id: true,
            borrow_date: true,
            return_date: true,
            due_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            books: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    });
}

/**
 * Creates a new borrow record
 * @param {object} borrowData - The borrow data
 * @returns {object} - The new borrow record 
 */

export const create = async (borrowData) => {
    return await prisma.borrow.create({
        data: {
            borrow_date: borrowData.borrow_date,
            return_date: borrowData.return_date,
            due_date: borrowData.due_date,
            status: borrowData.status,
            user: {
                connect: { id: borrowData.id_user}
            },
            books: {
                connect: { id: borrowData.id_book }
            }
        }
    })
}

/**
 * Updates a borrow record
 * @param {number} id - The id of the borrow record to update
 * @param {object} borrowData - The updated borrow data
 * @returns {object} - The updated borrow record
 */

export const update = async (id, borrowData) => {
    return await prisma.borrow.update({
        where: { id: id },
        data: {
            borrow_date: borrowData.borrow_date,
            return_date: borrowData.return_date,
            due_date: borrowData.due_date,
            status: borrowData.status,
            user: {
                connect: { id: borrowData.id_user }
            },
            books: {
                connect: { id: borrowData.id_book }
            }
        }
    });
}

/**
 * Deletes a borrow record
 * @param {number} id - The id of the borrow record to delete
 * @returns {object} - The deleted borrow record
 */

export const deleteById = async (id) => {
    const borrow = await getById(id);
    if (borrow) {
        await prisma.borrow.delete({
            where: { id: id }
        });
        return true;
    }
    return false;    
}
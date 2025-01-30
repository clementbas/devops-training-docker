import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of authors
 */
export const getAll = async (sortBy, sortDirection) => {
    let option = {
            select: {
                id: true,
                fullname: true,
                birthdate: true,
                deathdate: true,
                books: {
                    select: {
                        id: true,
                        title: true,
                        publication: true
                }
            }
            }
        };
    if (sortBy) {
        if (!sortDirection) sortDirection = 'asc';
        option.orderBy = {
            [sortBy]: sortDirection
        };
    }
    return await prisma.author.findMany(option);
};

/**
 * Returns a single author by its id
 * @param {number} id - The id of the author to get
 * @returns {object} - The author object or null if not found
 */
export const getById = async (id) => {
    return await prisma.author.findFirst({
        where: { id: id},
        select: {
            id: true,
            fullname: true,
            birthdate: true,
            deathdate: true,
            books: {
                select: {
                    id: true,
                    title: true,
                    publication: true
                }
            },
        }
    });
};

/**
 * Returns a single author by their fullname
 * @param {string} fullname - The fullname of the author to get
 * @returns {object} - The author object or null if not found
 */
export const getAuthorByFullname = async (fullname) => {
    return await prisma.author.findFirst({
        where: { fullname },
        select: {
            id: true,
            fullname: true,
            birthdate: true,
            deathdate: true,
            books: {
                select: {
                    id: true,
                    title: true,
                    publication: true
                }
            },
        }
    });
};

/**
 * Deletes an author by its id
 * @param {number} id - The id of the author to delete
 * @returns {boolean} - True if the author was deleted, false otherwise
 */
export const deleteById = async (id) => {
    const existingAuthor = await getById(id);
    if (existingAuthor) {
        await prisma.author.delete({
            where: {
                id
            }
        });
        return true;
    }
    return false;
};

/**
 * Creates a new author
 * @param {object} authorData - The data of the author to create
 * @returns {object} - The created author object
 */
export const create = async (authorData) => {
    return await prisma.author.create({
        data: {
            fullname: authorData.fullname,
            birthdate: authorData.birthdate,
            deathdate: authorData.deathdate
        }
    });
};

/**
 * Updates an author by its id
 * @param {number} id - The id of the author to update
 * @param {object} updatedData - The data to update
 * @returns {object} - The updated author object or null if not found
 */
export const update = async (id, updatedData) => {
    const updatedAuthor = await prisma.author.update({
        where: { id },
        data: updatedData
    });
    return updatedAuthor;
};

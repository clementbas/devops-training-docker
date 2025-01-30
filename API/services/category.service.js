import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of categories
 */

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            name: true,
            description: true,
            books: {
                select: {
                    id: true,
                    title: true,
                    publication: true,
                    description: true,
                    note: true,
                    comments: true,
                    author: {
                        select: {
                            id: true,
                            fullname: true,
                            birthdate: true,
                            deathdate: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    },
                    publisher: {
                        select: {
                            id: true,
                            name: true,
                            adress: true,
                            website: true
                        }
                    }
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
    return await prisma.category.findMany(options);
}

/**
 * Returns a single category by its id
 * @param {number} id - The id of the category to get
 * @returns {object} - The category object or null if not found
 */

export const getById = async (id) => {
    return await prisma.category.findFirst({
        select: {
            id: true,
            name: true,
            description: true,
            books: {
                select: {
                    id: true,
                    title: true,
                    publication: true,
                    description: true,
                    note: true,
                    comments: true,
                    author: {
                        select: {
                            id: true,
                            fullname: true,
                            birthdate: true,
                            deathdate: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    },
                    publisher: {
                        select: {
                            id: true,
                            name: true,
                            adress: true,
                            website: true
                        }
                    }
                }
            }
        },
        where: {
            id
        }
    });
}

/**
 * Returns a single category by its name
 * @param {string} name - The name of the category to get
 * @returns {object} - The category object or null if not found
 */

export const getByName = async (name) => {
    return await prisma.category.findFirst({
        where: { name },
        
        select: {
            books: {
                select: {
                    id: true,
                    title: true,
                    publication: true,
                    description: true,
                    note: true,
                    comments: true,
                    author: {
                        select: {
                            id: true,
                            fullname: true,
                            birthdate: true,
                            deathdate: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true,
                            description: true
                        }
                    },
                    publisher: {
                        select: {
                            id: true,
                            name: true,
                            adress: true,
                            website: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Creates a new category
 * @param {object} categoryData - The data of the category to create
 * @returns {object} - The created category object
 */

export const create = async (categoryData) => {
    return await prisma.category.create({
        data: {
            name: categoryData.name,
            description: categoryData.description
        }
    });
}

/**
 * Updates a category by its id
 * @param {number} id - The id of the category to update
 * @param {object} categoryData - The data to update
 * @returns {object} - The updated category object
 */

export const update = async (id, categoryData) => {
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
            name: categoryData.name,
            description: categoryData.description
        }
    });
}

/**
 * Deletes a category by its id
 * @param {number} id - The id of the category to delete
 * @returns {object} - The deleted category object
 */

export const deleteById = async (id) => {
    const category = await getById(id);
    if (category) {
        await prisma.category.delete({
            where: {
                id
            }
        });
        return true;
    }
    return false;
}
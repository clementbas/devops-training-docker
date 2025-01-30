import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of authors
 */
export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            name: true,
            adress: true,
            website: true,
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
    return await prisma.publisher.findMany(options);
};

/**
 * Returns a single publisher by its id
 * @param {number} id - The id of the publisher to get
 * @returns {object} - The publisher object or null if not found
 */
export const getById = async (id) => {
    return await prisma.publisher.findFirst({
        select: {
            id: true,
            name: true,
            adress: true,
            website: true,
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
};

/**
 * Returns a single publisher by their name
 * @param {string} name - The name of the publisher to get
 * @returns {object} - The publisher object or null if not found
 */
export const getByName = async (name) => {
    return await prisma.publisher.findFirst({
        where: { name },

        select: {
            id: true,
            name: true,
            adress: true,
            website: true,
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
                    }
                }
            }
        }
    });
}

/**
 * Creates a new publisher
 * @param {object} publisherData - The data of the publisher to create
 * @returns {object} - The created publisher object
 */
export const create = async (publisherData) => {
    return await prisma.publisher.create({
        data: {
            name: publisherData.name,
            adress: publisherData.adress,
            website: publisherData.website
        }
    });
};

/**
 * Updates a publisher by its id
 * @param {number} id - The id of the publisher to update
 * @param {object} publisherData - The data to update
 * @returns {object} - The updated publisher object or null if not found
 */
export const update = async (id, publisherData) => {
    const updatePublisher = await prisma.publisher.update({
        where: { id },
        data: {
            name: publisherData.name,
            adress: publisherData.adress,
            website: publisherData.website
        }
    });
    return updatePublisher;
};

/**
 * Deletes a publisher by its id
 * @param {number} id - The id of the publisher to delete
 * @returns {boolean} - True if the publisher was deleted, false otherwise
 */
export const deleteById = async (id) => {
    const publisher = await getById(id);
    if (publisher) {
        await prisma.publisher.delete({
            where: {
                id
            }
        });
        return true;
    }
    return false;
};
import e from 'express';
import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of reasons
 */

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            label: true,
            description: true,
            bills: {
                select: {
                    id: true,
                    amount: true,
                    payment_date: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
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
    return await prisma.reason.findMany(options);
}

/**
 * Returns a single reason by its id
 * @param {number} id - The id of the reason to get
 * @returns {object} - The reason object or null if not found
 */

export const getById = async (id) => {
    return await prisma.reason.findFirst({
        select: {
            id: true,
            label: true,
            description: true,
            bills: {
                select: {
                    id: true,
                    amount: true,
                    payment_date: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
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
 * Returns reasons by its label
 * @param {string} label - The label of the reason to get
 * @returns {object} - The reason object or null if not found
 * @returns {Array} - An array of reasons
 */

export const getByLabel = async (label) => {
    return await prisma.reason.findMany({
        where: { label },

        select: {
            id: true,
            label: true,
            description: true,
            bills: {
                select: {
                    id: true,
                    amount: true,
                    payment_date: true,
                    status: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Creates a new reason
 * @param {object} reasonData - The data of the reason to create
 * @returns {object} - The created reason object
 */

export const create = async (reasonData) => {
    return await prisma.reason.create({
        data: {
            label: reasonData.label,
            description: reasonData.description,
            bill: reasonData.bill
        }
    });
};

/**
 * Updates a reason by its id
 * @param {number} id - The id of the reason to update
 * @param {object} reasonData - The data to update
 * @returns {object} - The updated reason object
 */

export const update = async (id, reasonData) => {
    const updatedReason = await prisma.reason.update({
        where: { id },
        data: {
            label: reasonData.label,
            description: reasonData.description
        }
    });
    return updatedReason;
};

/**
 * Deletes a reason by its id
 * @param {number} id - The id of the reason to delete
 * @returns {boolean} - True if the reason was deleted, false otherwise
 */

export const deleteById = async (id) => {
    const reason = await getById(id);
    if (reason) {
        await prisma.reason.delete({
            where: { id }
        });
        return true;
    }
    return false;
};
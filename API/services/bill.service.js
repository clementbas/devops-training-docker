import prisma from '../db.js';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of bills
 */

export const getAll = async (sortBy, sortDirection) => {
    let options = {
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
            },
            reason: {
                select: {
                    id: true,
                    label: true,
                    description: true
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
    return await prisma.bill.findMany(options);
};

/**
 * Returns a single bill by its id
 * @param {number} id - The id of the bill to get
 * @returns {object} - The bill object or null if not found
 */

export const getById = async (id) => {
    return await prisma.bill.findUnique({
        where: { id: id },
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
            },
            reason: {
                select: {
                    id: true,
                    label: true,
                    description: true
                }
            }
        }
    });
};

/**
 * Returns all bills for a user
 * @param {number} userId - The id of the user to get bills for
 * @returns {Array} - An array of bills
 */

export const getByUserId = async (userId) => {
    return await prisma.bill.findMany({
        where: { id_user: userId },
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
            },
            reason: {
                select: {
                    id: true,
                    label: true,
                    description: true
                }
            }
        }
    });
};

/**
 * Return all bills for a reason
 * @param {number} reasonId - The id of the reason to get bills for
 * @returns {Array} - An array of bills
 */

export const getByReasonId = async (reasonId) => {
    return await prisma.bill.findMany({
        where: { id_reason: reasonId },
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
            },
            reason: {
                select: {
                    id: true,
                    label: true,
                    description: true
                }
            }
        },
    });
}

/**
 * Returns all bills for a status
 * @param {string} status - The status of the bills to get
 * @returns {Array} - An array of bills
 */

export const getByStatus = async (status) => {
    return await prisma.bill.findMany({
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
            },
            reason: {
                select: {
                    id: true,
                    label: true,
                    description: true
                }
            }
        },
        where: {
            status
        }
    });
}

/**
 * Creates a new bill
 * @param {object} billData - The data of the bill to create
 * @returns {object} - The created bill object
 */

export const create = async (billData) => {
    return await prisma.bill.create({
        data: {
            amount: billData.amount,
            payment_date: billData.payment_date,
            status: billData.status,
            user: {
                connect: { id: billData.id_user }
            },
            reason: {
                connect: { id: billData.id_reason }
            }
        }
    });
}

/**
 * Updates a bill
 * @param {number} id - The id of the bill to update
 * @param {object} billData - The data to update the bill with
 * @returns {object} - The updated bill object
 */

export const update = async (id, billData) => {
    const updateBill = await prisma.bill.update({
        where: { id },
        data: {
            amount: billData.amount,
            payment_date: billData.payment_date,
            status: billData.status,
            userId: billData.userId,
            reasonId: billData.reasonId
        }
    });
    return updateBill;
}

/**
 * Deletes a bill
 * @param {number} id - The id of the bill to delete
 * @returns {object} - The deleted bill object
 */

export const deleteById = async (id) => {
    const bill = await getById(id);
    if (bill) {
        await prisma.bill.delete({
            where: {
                id
            }
        });
        return true;
    }
    return false;
}
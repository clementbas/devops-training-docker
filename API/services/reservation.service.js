import prisma from "../db.js";

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of reservation records
 */

export const getAll = async (sortBy, sortDirection) => {
    let options = {
        select: {
            id: true,
            reservation_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            reservationBooks: {
                select: {
                    book: {
                        select: {
                            id: true,
                            title: true
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
    return await prisma.reservation.findMany(options);
}

/**
 * Returns a single reservation record by its id
 * @param {number} id - The id of the reservation record to get
 * @returns {object} - The reservation record object or null if not found
 */

export const getById = async (id) => {
    return await prisma.reservation.findUnique({
        where: { id: id },
        select: {
            id: true,
            reservation_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            reservationBooks: {
                select: {
                    book: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Returns all reservation records for a given user
 * @param {number} id - The id of the user to get reservations for
 * @returns {Array} - An array of reservation records
 */

export const getByUserId = async (id) => {
    return await prisma.reservation.findMany({
        where: { id_user: id },
        select: {
            id: true,
            reservation_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            reservationBooks: {
                select: {
                    book: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Returns all reservation records for a given book
 * @param {number} bookId - The id of the book to get reservations for
 * @returns {Array} - An array of reservation records
 */

export const getByBookId = async (bookId) => {
    return await prisma.reservation.findMany({
        where: {
            reservationBooks: {
                some: {
                    id_books: bookId
                }
            }
        },
        select: {
            id: true,
            reservation_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            reservationBooks: {
                select: {
                    book: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Returns all reservation by status
 * @param {string} status - The status of the reservation to get
 * @returns {Array} - An array of reservation records
 */

export const getByStatus = async (status) => {
    return await prisma.reservation.findMany({
        where: { status: status },
        select: {
            id: true,
            reservation_date: true,
            status: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            reservationBooks: {
                select: {
                    book: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            }
        }
    });
}

/**
 * Creates a new reservation record
 * @param {object} reservationData - The reservation data to create
 * @returns {object} - The created reservation record
 */

export const create = async (reservationData) => {
    return await prisma.reservation.create({
        data: {
            reservation_date: reservationData.reservation_date,
            status: reservationData.status,

            user: {
                connect: { id: reservationData.id_user }
            },
            reservationBooks: {
                create: { id_books: reservationData.id_book }
            }
        }
    })
}

/**
 * Creates a new reservation for a user
 * @param {number} userId - The id of the user making the reservation
 * @param {object} reservationData - The reservation data (e.g., bookId)
 * @returns {object} - The created reservation record
 */
export const createForUser = async (userId, reservationData) => {
    return await prisma.reservation.create({
        data: {
            reservation_date: reservationData.reservation_date,
            status: 'pending',
            user: {
                connect: { id: userId }
            },
            reservationBooks: {
                create: { id_books: reservationData.bookId }
            }
        }
    });
};

/**
 * Accepts a reservation by updating its status to 'accepted'
 * @param {number} id - The id of the reservation to accept
 * @returns {object} - The updated reservation record
 */
export const acceptReservation = async (id) => {
    return await prisma.reservation.update({
        where: { id: parseInt(id) },
        data: {
            status: 'accepted'
        }
    });
};
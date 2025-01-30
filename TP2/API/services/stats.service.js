// API/services/stats.service.js
import prisma from '../db.js';

export const getBorrowedBooksCount = async () => {
    const count = await prisma.borrow.count({
        where: {
            status: 'emprunté'
        }
    });
    return count;
};

export const getReturnedBooksCount = async () => {
    const count = await prisma.borrow.count({
        where: {
            status: 'Rendu'
        }
    });
    return count;
};

export const getPendingBillsCount = async () => {
    const count = await prisma.bill.count({
        where: {
            status: 'En attente'
        }
    });
    return count;
};

export const getPaidBillsCount = async () => {
    const count = await prisma.bill.count({
        where: {
            status: 'Payé'
        }
    });
    return count;
};

export const getPendingReservationsCount = async (bookId) => {
    const count = await prisma.reservation.count({
        where: {
            status: 'pending',
            reservationBooks: {
                some: {
                    id_books: parseInt(bookId, 10)
                }
            }
        }
    });
    return count;
};
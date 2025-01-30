import {
    getAll,
    getById,
    getByUserId,
    getByBookId,
    getByStatus,
    create,
    createForUser,
    acceptReservation
} from '../services/reservation.service.js';
import jwt from 'jsonwebtoken';

export const getReservations = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection);
    res.json({
        success: true,
        data
    });
}

export const getReservationById = async (req, res) => {
    const reservation = await getById(parseInt(req.params.id));

    if (!reservation) {
        return res.status(404).json({
            success: false,
            message: 'Reservation not found'
        });
    }

    res.json({
        success: true,
        data: reservation
    });
}

export const getReservationByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const reservation = await getByUserId(parseInt(userId));

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found for the given user'
            });
        }

        res.json({
            success: true,
            data: reservation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving reservation',
            errors: error.message
        });
    }
}

export const getReservationByBookId = async (req, res) => {
    const { bookId } = req.params;

    try {
        const reservation = await getByBookId(parseInt(bookId));

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found for the given book'
            });
        }

        res.json({
            success: true,
            data: reservation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving reservation',
            errors: error.message
        });
    }
}

export const getReservationByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        const reservation = await getByStatus(status);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found for the given status'
            });
        }

        res.json({
            success: true,
            data: reservation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error retrieving reservation',
            errors: error.message
        });
    }
}

export const createReservation = async (req, res, next) => {
    const reservationData = req.body;

    try {
        const newReservation = await create(reservationData);
        res.status(201).json({
            success: true,
            data: newReservation
        });
    } catch (e) {
        next(e);
    }
}

export const createReservationForUser = async (req, res, next) => {
    const reservationData = req.body;

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const newReservation = await createForUser(userId, {
            ...reservationData,reservation_date: new Date().toISOString()
        });
        res.status(201).json({
            success: true,
            data: newReservation
        });
    } catch (e) {
        next(e);
    }
};

export const acceptReservationUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updatedReservation = await acceptReservation(parseInt(id));
        res.status(200).json({
            success: true,
            data: updatedReservation
        });
    } catch (e) {
        next(e);
    }
};
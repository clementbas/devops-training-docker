import prisma from '../db.js';
import bcrypt from 'bcrypt';

/**
 * @param {string} sortBy - The field to sort by (optional)
 * @param {string} sortDirection - The direction to sort by (optional, default is 'ASC')
 * @returns {Array} - An array of users
 */
export const getAll = async (sortBy, sortDirection) => {
    // If the sortBy parameter is provided, we will sort the users array
    let options = {
        select: {
            id: true,
            name: true,
            firstname: true,
            email: true,
            adress: true,
            birthdate: true,
            borrows: true,
            reservations: true,
            bills: {
                select: {
                    id: true,
                    amount: true,
                    payment_date: true,
                    status: true,
                    reason: {
                        select: {
                            id: true,
                            label: true,
                            description: true
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
    return await prisma.user.findMany(options);
};

/**
 * Returns a single user by its id
 * @param {number} id - The id of the user to get 
 * @returns {object} - The user object or null if not found
 */
export const getById = async (id) => {
    return await prisma.user.findFirst({
        select: {
            id: true,
            name: true, // Champ réel du modèle
            email: true, // Champ réel du modèle
            firstname: true, // Si vous voulez inclure d'autres champs
            adress: true,
            birthdate: true,
            borrows: true,
            reservations: true,
            bills: {
                select: {
                    id: true,
                    amount: true,
                    payment_date: true,
                    status: true,
                    reason: {
                        select: {
                            id: true,
                            label: true,
                            description: true
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

export const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },

        select: {
            id: true,
            name: true, // Champ réel du modèle
            email: true, // Champ réel du modèle
            firstname: true, // Si vous voulez inclure d'autres champs
            adress: true,
            birthdate: true,
            borrows: true,
            reservations: true,
            bills: {
                select: {
                    id: true,
                    amount: true,
                    payment_date: true,
                    status: true,
                    reason: {
                        select: {
                            id: true,
                            label: true,
                            description: true
                        }
                    }
                }
            }
        },
    });
};


export const deleteById = async (id) => {
    if (await getById(id)) {
        await prisma.user.delete({
            where: {
                id
            }
        })
        return true
    }
    return false
}

export const create = async (userData) => {
    const countEmail = await prisma.user.count({
        where: {
            email: userData.email
        }
    })

    if (countEmail > 0) {
        throw new Error('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    return await prisma.user.create({
        data: {
            name: userData.name,
            password: hashedPassword, // Utiliser le mot de passe haché
            email: userData.email,
            firstname: userData.firstname,
            adress: userData.adress,
            birthdate: userData.birthdate
        }
    });
};

export const update = async (id, updatedData) => {
    if (updatedData.password) {
        const saltRounds = 10;
        updatedData.password = await bcrypt.hash(updatedData.password, saltRounds);
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: updatedData,
        select: {
            id: true,
            name: true,
            email: true,
            firstname: true,
            adress: true,
            birthdate: true,
        }
    });
    return updatedUser;
};
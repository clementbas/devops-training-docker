import { getAll, getById, getUserByEmail as getUserByEmailService, deleteById, create, update } from '../services/users.service.js'

export const getUsers = async (req, res) => {
    const data = await getAll(req.query.sortBy, req.query.sortDirection)
    res.json({
        success: true,
        data
    })
}

export const getUserById = async (req, res) => {
    const user = await getById(parseInt(req.params.id))

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }

    return res.json({
        success: true,
        data: user
    })
}

export const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    const user = await getUserByEmailService(email);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    res.json({
        success: true,
        data: user
    });
};


export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifie si l'utilisateur existe
        const user = await getById(parseInt(id));
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Vérifie si l'utilisateur est un administrateur ou s'il essaie de supprimer son propre compte
        if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only delete your own account.'
            });
        }

        // Supprime l'utilisateur
        const hasBeenDeleted = await deleteById(parseInt(id));
        if (!hasBeenDeleted) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error deleting user',
            errors: error.message
        });
    }
};

export const createUser = async (req, res, next) => {
    const userData = req.body;
    try {
        const newUser = await create(userData);
        res.json({
            success: true,
            data: newUser
        });
    } catch (e) {
        next(e)
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        // Vérifie si l'utilisateur existe
        const user = await getById(parseInt(id));
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Vérifie si l'utilisateur est un administrateur ou s'il essaie de modifier son propre compte
        if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only modify your own account.'
            });
        }

        // Met à jour l'utilisateur
        const updatedUser = await update(parseInt(id), updatedData);

        res.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating user',
            errors: error.message
        });
    }
};
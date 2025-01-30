import express from 'express';
import { login, signup } from '../controllers/auth.controller.js';
import { check } from 'express-validator';

const router = express.Router();

router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], login);

router.post('/signup', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('name').not().isEmpty()
], signup);

export default router;
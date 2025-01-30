import express from 'express'; // Import express
import * as OpenApiValidator from 'express-openapi-validator'; // Import the OpenAPI validator
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Configure dotenv

import usersRouter from './routers/users.router.js'; // Import the users router
import booksRouter from './routers/books.router.js'; // Import the books router
import authorsRouter from './routers/authors.router.js'; // Import the authors router
import authRouter from './routers/auth.router.js'; // Import the auth router
import publisherRouter from './routers/publisher.router.js'; // Import the publisher router
import categoryRouter from './routers/category.router.js'; // Import the category router
import reasonRouter from './routers/reason.router.js'; // Import the reason router
import billRouter from './routers/bill.router.js'; // Import the bill router
import borrowRouter from './routers/borrow.router.js'; // Import the borrow router
import reservationRouter from './routers/reservation.router.js'; // Import the reservation router
import statsRouter from './routers/stats.router.js'; // Import the stats router

const app = express(); // Create an express application

app.use(express.json()); // Parse JSON bodies

app.use(OpenApiValidator.middleware({ // Use the OpenAPI validator middleware
    apiSpec: './openapi-main.yaml',    // Specify the path to the OpenAPI specification
}));

app.use('/users', usersRouter); // Use the users router

app.use('/books', booksRouter); // Use the books router

app.use('/authors', authorsRouter); // Use the authors router

app.use('/auth', authRouter); // Use the auth router

app.use('/publisher', publisherRouter); // Use the publisher router

app.use('/category', categoryRouter); // Use the category router

app.use('/reason', reasonRouter); // Use the reason router

app.use('/bill', billRouter); // Use the bill router

app.use('/borrow', borrowRouter); // Use the borrow router

app.use('/reservations', reservationRouter); // Use the reservation router

app.use('/stats', statsRouter); // Use the stats router

app.use((err, req, res, next) => { // Error handler
    res.status(err.status || 500).json({ // Send the error message and status
        message: err.message, // Send the error message
        errors: err.errors, // Send the
    });

    next();
});

app.listen(3000, () => { // Start the server
    console.log('Server is running on http://localhost:3001'); // Log a message
});

export default app;
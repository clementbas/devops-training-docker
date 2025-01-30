import app from './app.js'
import prisma from './db.js'

const PORT = 3000; // Changer le port ici

prisma.$connect().then(async () => {  
    console.log('Connected to the database')

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`)
    })
}).catch((error) => {  
    console.error(error)
})
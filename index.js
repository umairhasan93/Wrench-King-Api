const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes')
const mechanicRoute = require('./routes/mechanicRoute')
const towingVanRoute = require('./routes/towingVanRoutes')
const userRoute = require('./routes/userRoutes')
const bookingRoute = require('./routes/bookingRoutes')
const complainRoute = require('./routes/complainRoutes')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors')

const app = express();
dotenv.config()
connectDB()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Api is Running')
})



app.use('/api/admin', adminRoutes)

app.use('/api/mechanics', mechanicRoute)

app.use('/api/towingVan', towingVanRoute)

app.use('/api/user', userRoute)

app.use('/api/booking', bookingRoute)

app.use('/api/complain', complainRoute)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('Server Started On Port ' + PORT));
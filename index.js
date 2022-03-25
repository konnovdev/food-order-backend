import express from 'express'
import restaurantRoutes from './routes/restaurants.js'
import menuRoutes from './routes/menu.js'

const app = express()
const PORT = process.env.NODEJS_PORT ?? 3000

app.use(restaurantRoutes)
app.use(menuRoutes)

app.listen(PORT, () => {
    console.log(`server has been started on ${PORT}`)
})
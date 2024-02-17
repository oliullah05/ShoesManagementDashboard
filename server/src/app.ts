import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { dbConnect } from './utils/dbConnect'
import notFound from './app/middlewares/notFound'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
import { AuthRouter } from './app/modules/auth/auth.route'
import { SaleRoutes } from './app/modules/sale/sale.route'
import cookieParser from 'cookie-parser'
import { ShoePolishRoutes } from './app/modules/shoePolish/shoePolish.route'
import { ShoeRoutes } from './app/modules/shoe/shoe.route'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(cookieParser())

// connections
dbConnect()

// application route
app.use('/api/v1/user', UserRoutes)
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/shoe', ShoeRoutes)
app.use('/api/v1/sale', SaleRoutes)
app.use('/api/v1/shoePolish', ShoePolishRoutes)

const getController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API of Shoes Management Dashboard',
  })
}


app.get('/', getController)

app.use(globalErrorHandler)

app.use(notFound)

export default app

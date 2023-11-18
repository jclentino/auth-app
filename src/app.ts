import express from "express";
import morgan from "morgan";
import cors from 'cors'
import passport from 'passport'
import passportMiddleware from "./middlewares/passport";
import authRoutes from './routes/auth.routes'
import docentesRoutes from './routes/docentes.routes'

const app = express()

// settings 
app.set('port', process.env.PORT || 3000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(passport.initialize())
passport.use(passportMiddleware)

// routes 
app.use(authRoutes)
app.use(docentesRoutes)

export default app 

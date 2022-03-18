import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './routes/main.routes.js'

// Inicio aplicación
const app = express()

// Settings
app.set('port', 8080)

// Middlewares
app.use(morgan('dev'))

// Routes
app.use(router)

export default app
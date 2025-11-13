import dotenv from 'dotenv'
// 1. Load environment variables at the absolute top
dotenv.config()

import express from 'express'
import cors from 'cors'
import { dbConnection } from './db/db.connection.js'

// 2. Import and Configure Cloudinary AFTER dotenv has run
import cloudinary from './uttils/cloudinary.js';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// 3. Now, connect to DB (which might also use env vars)
dbConnection();
const port = process.env.PORT

const app = express()

const allowedOrigins = [process.env.LOCAL_PORT, process.env.FRONTEND_URL, process.env.DOMAIN_URL]

app.use(express.json())
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

// 4. Import routes AFTER all configuration is done
import { userRoute } from './routes/user.route.js';
import { contactRoute } from './routes/contact.route.js'
import { fetchRolesRoute } from './routes/volunteer&donor.route.js'
import { blogRoute } from './routes/blog.route.js';

app.use('/meripehchaan/api/v1', userRoute)
app.use('/meripehchaan/api/v1', contactRoute)
app.use('/meripehchaan/api/v1', fetchRolesRoute)
app.use('/meripehchaan/api/v1', blogRoute)

app.listen(port, () => {
    console.log('SERVER IS RUNNING ON PORT : ', port)
})
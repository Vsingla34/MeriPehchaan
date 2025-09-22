import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './db/db.connection.js'

dotenv.config()
dbConnection();
const port = process.env.PORT


const app = express()


const allowedOrigins = [process.env.LOCAL_PORT,process.env.FRONTEND_URL,process.env.DOMAIN_URL]

app.use(express.json())
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

import { userRoute } from './routes/user.route.js';
import {contactRoute}from './routes/contact.route.js'
import {fetchRolesRoute} from './routes/volunteer&donor.route.js'
app.use('/meripehchaan/api/v1',userRoute)
app.use('/meripehchaan/api/v1',contactRoute)
app.use('/meripehchaan/api/v1',fetchRolesRoute)




app.listen(port, ()=>{
    console.log('SERVER IS RUNNING ON PORT : ', port)
})



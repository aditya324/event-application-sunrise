import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cors from 'cors'

import authroutes from './routes/auth.routes.js'
import eventroutes from './routes/event.routes.js'


dotenv.config();
const app = express();





connect()






app.use(cors());
app.use(express.json());


app.use('/api/auth', authroutes);
app.use('/api/events', eventroutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

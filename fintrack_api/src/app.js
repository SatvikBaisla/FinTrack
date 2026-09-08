require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const authRouter = require('./router/auth-router');

app.use('/api/auth', authRouter);

app.listen(process.env.DB_PORT, () => {
    console.log(`FinTrack API running on port ${process.env.DB_PORT}`);
});
require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('./router/auth-router');

app.use('/api/auth', authRouter);

app.listen(process.env.DB_PORT, () => {
    console.log(`FinTrack API running on port ${process.env.DB_PORT}`);
});
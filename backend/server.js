require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./database/connection');

const projectRouter = require('./routes/project.router');

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/api/v1/project', projectRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
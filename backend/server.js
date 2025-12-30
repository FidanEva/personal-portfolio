require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./database/connection');


const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

const projectRouter = require('./routes/project.router');
const multerErrorHandler = require('./middleware/error-handler');

app.use('/api/v1/project', projectRouter);
app.use(multerErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const collegeRouter = require('./routes/colleges');
const studentRouter = require('./routes/students');

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.use('/colleges', collegeRouter);
app.use('/students', studentRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
    res.status(404).send('The page you are looking for is not there.');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

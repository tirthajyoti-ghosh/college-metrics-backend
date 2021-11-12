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
    res.json({
        description: 'Welcome to the API! Below you can find all the routes for this API along with descriptions.',
        routes: {
            description: 'There are two primary routes => /colleges and /students',
            colleges: {
                '/colleges/:id': {
                    description: 'Returns a single college based on the id provided.',
                    example: 'https://college-metrics-backend.vercel.app/colleges/618b84b2399bb68fbb64fe56',
                },
                '/colleges/stats': {
                    description: 'Returns the stats for all the colleges i.e., no. of colleges grouped by countries and courses they offer',
                    example: 'https://college-metrics-backend.vercel.app/colleges/stats',
                },
                '/colleges/:id/similar': {
                    description: 'Returns the similar colleges based on the id provided. Similar in courses offered and location',
                    example: 'https://college-metrics-backend.vercel.app/colleges/618b84b2399bb68fbb64fe56/similar',
                },
                '/colleges/:id/students': {
                    description: 'Returns the students of a college based on the id provided.',
                    example: 'https://college-metrics-backend.vercel.app/colleges/618b84b2399bb68fbb64fe56/students',
                },
                '/colleges/list': {
                    description: "Returns a list of all the colleges. If the query params 'type' and 'value' are provided, then only those specific colleges (corresponding to type and value) will be returned. In order to get specific colleges, both 'type' and 'value' query params MUST be provided, otherwise a 400 status code is returned. 'type' query param MUST have one of these two values => 'country' OR 'course'. The value must be in accordance with the type.",
                    examples: [
                        'https://college-metrics-backend.vercel.app/colleges/list?type=country&value=United%20States',
                        'https://college-metrics-backend.vercel.app/colleges/list?type=course&value=Computer%20Science',
                        'https://college-metrics-backend.vercel.app/colleges/list',
                    ],
                    'query-params': {
                        type: "MUST be 'country' OR 'course'. If this is present, then 'value' param MUST be present.",
                        value: "MUST be in accordance with the 'type' param. If the 'type' is 'country', then a country should be provided. Putting a course instead will return 404 status code. Same for course. If this is present, then 'type' param MUST be present",
                    },
                },
            },
            students: {
                '/students/:id': {
                    description: 'Returns a single student based on the id provided.',
                    example: 'https://college-metrics-backend.vercel.app/students/618b9fd92aa253a25e0ef547',
                },
            },
        },
    });
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

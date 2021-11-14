# College metrics API

Welcome to the API! This application is for college metrics dashboard frontend. It is built using Express.js and MongoDB with Mongoose. Below you can find all the routes for this API along with descriptions.

Checkout the API here: <https://college-metrics-backend.vercel.app/>

## Routes

There are two primary routes => `/colleges` and `/students`.

### `/colleges`

* `/colleges/:id` - Returns a single college based on the id provided.

  Example: `https://college-metrics-backend.vercel.app/colleges/618b84b2399bb68fbb64fe56`

  Sample response

  ```json
  {
        "numberOfStudents": 100,
        "courses": [
            "Virology",
            "Neuroscience",
            "Applied Physics",
            "Music",
            "English"
        ],
        "name": "Universidad de La Guajira",
        "yearFounded": 1990,
        "city": "Elías",
        "country": "Colombia",
        "id": "618b84b2399bb68fbb64fe56"
  }
  ```

* `/colleges/stats` - Returns the stats for all the colleges i.e., no. of colleges grouped by countries and courses they offer

  Example: `https://college-metrics-backend.vercel.app/colleges/stats`

  Sample response

  ```json
  {
        "countryStats": [
            {
                "country": "Greece",
                "count": 4
            },
            {
                "country": "Poland",
                "count": 2
            },
            .
            .
            .
        ],
        "courseStats": [
            {
                "course": "Applied Physics",
                "count": 71
            },
            {
                "course": "English",
                "count": 68
            },
            .
            .
            .
        ]
  }
  ```

* `/colleges/:id/similar` - Returns the similar colleges based on the id provided. Similar in courses offered and location.

  Example: `https://college-metrics-backend.vercel.app/colleges/618b84b2399bb68fbb64fe56/similar`

  Sample response

  ```json
  [
        {
            "numberOfStudents": 100,
            "name": "Universidad Central del Valle del Cauca",
            "yearFounded": 2001,
            "city": "Carepa",
            "country": "Colombia",
            "similarCourses": [
                "Applied Physics",
                "Virology"
            ],
            "id": "618b84b2399bb68fbb64feb9"
        },
        .
        .
        .
  ]
  ```

* `/colleges/:id/students` - Returns the students for a college based on the id provided.

  Example: `https://college-metrics-backend.vercel.app/colleges/618b84b2399bb68fbb64fe56/students`

  Sample response

  ```json
  [
        {
            "skills": [
                "Journal Entries",
                "HSE Management Systems",
                "SBEM",
                "Film Production",
                "Tumblr"
            ],
            "name": "Engelbert Cummins",
            "yearOfBatch": 1992,
            "collegeId": "618b84b2399bb68fbb64fe56",
            "id": "618b9fd92aa253a25e0ef53b"
        }
        .
        .
        .
  ]
  ```

* `/colleges/list` - Returns a list of all the colleges. If the query params 'type' and 'value' are provided, then only those specific colleges (corresponding to type and value) will be returned.

  In order to get specific colleges, both 'type' and 'value' query params MUST be provided, otherwise a 400 status code is returned. 'type' query param MUST have one of these two values => 'country' OR 'course'. The value must be in accordance with the type.

  **Examples**:

  #### NO QUERY PARAMS - Returns all the colleges

  Example: `https://college-metrics-backend.vercel.app/colleges/list`

  Sample response

  ```json
  [
        {
            "numberOfStudents": 100,
            "courses": [
                "Neuroscience",
                "Computer Science",
                "Music",
                "English"
            ],
            "name": "Pangasinan State University",
            "yearFounded": 2002,
            "city": "Nueva Fuerza",
            "country": "Philippines",
            "id": "618b84b2399bb68fbb64fe59"
        },
        .
        .
        .
  ]
  ```

  #### 'type' AND 'value' QUERY PARAMS PRESENT - Returns the colleges corresponding to the type and value provided
  
  Both 'type' and 'value' query params MUST be provided, otherwise a 400 status code is returned. 'type' query param MUST have one of these two values => 'country' OR 'course'. The value must be in accordance with the type.

  Examples:

  * When 'type' is 'country' and 'value' is 'Philippines', then only the colleges in the Philippines will be returned.

    Example: `https://college-metrics-backend.vercel.app/colleges/list?type=country&value=Philippines`

    Sample response

    ```json
    [
        {
            "numberOfStudents": 100,
            "courses": [
                "Neuroscience",
                "Computer Science",
                "Music",
                "English"
            ],
            "name": "Pangasinan State University",
            "yearFounded": 2002,
            "city": "Nueva Fuerza",
            "country": "Philippines",
            "id": "618b84b2399bb68fbb64fe59"
        },
        .
        .
        .
    ]
    ```

  * When 'type' is 'course' and 'value' is 'Music', then only the colleges offering Music will be returned.

    Example: `https://college-metrics-backend.vercel.app/colleges/list?type=course&value=Music`

    Sample response

    ```json
    [
        {
            "numberOfStudents": 100,
            "courses": [
                "Music"
            ],
            "name": "Universidad de La Guajira",
            "yearFounded": 1990,
            "city": "Elías",
            "country": "Colombia",
            "id": "618b84b2399bb68fbb64fe56"
        },
        .
        .
        .
    ]
    ```

### `/students`

* `/students/:id` - Returns the student based on the id provided.

  Example: `https://college-metrics-backend.vercel.app/students/618b9fd92aa253a25e0ef547`

  Sample response

  ```json
  {
        "skills": [
            "Journal Entries",
            "HSE Management Systems",
            "SBEM",
            "Film Production",
            "Tumblr"
        ],
        "name": "Engelbert Cummins",
        "yearOfBatch": 1992,
        "collegeId": "618b84b2399bb68fbb64fe56",
        "id": "618b9fd92aa253a25e0ef547"
  }
  ```

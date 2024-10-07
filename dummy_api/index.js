const express = require('express');
const axios = require('axios')

const app = express();

const PORT = 3001;
const HOST = 'localhost';

app.use(express.json());
app.disable('x-powered-by');

app.get('/dummy-api', (req, res) => {
    res.send({
        "services": [
            {
                "id": 1,
                "name": "Authentication Service",
                "description": "Provides user authentication and authorization.",
                "status": "active",
                "createdAt": "2024-01-10T10:45:00Z"
            },
            {
                "id": 2,
                "name": "Payment Gateway",
                "description": "Handles payment processing and transactions.",
                "status": "active",
                "createdAt": "2024-02-12T12:30:00Z"
            },
            {
                "id": 3,
                "name": "Notification Service",
                "description": "Sends email, SMS, and push notifications.",
                "status": "active",
                "createdAt": "2024-02-25T14:00:00Z"
            },
            {
                "id": 4,
                "name": "User Profile Service",
                "description": "Manages user profiles and account settings.",
                "status": "inactive",
                "createdAt": "2024-03-05T09:00:00Z"
            },
            {
                "id": 5,
                "name": "Data Analytics Service",
                "description": "Processes and analyzes user data.",
                "status": "active",
                "createdAt": "2024-03-15T16:45:00Z"
            }]
    })
});

app.post('/post-api', (req, res) => {
    res.send('Hello from post api');

});

app.listen(PORT, () => {
    console.log('Dummy API listening on port ' + PORT);
});
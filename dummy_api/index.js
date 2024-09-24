const express = require('express');
const axios = require('axios')

const app = express();

const PORT = 3001;
const HOST = 'localhost';

app.use(express.json());
app.disable('x-powered-by');

app.get('/dummy-api', (req, res) => {
    res.send('Hello from dummy API');
});

app.post('/post-api', (req, res) => {
    res.send('Hello from post api');

});

app.listen(PORT, () => {
    console.log('Dummy API listening on port '+PORT);
    axios({
        method: "POST",
        url: 'http://localhost:3000/services/testAPI/instances',
        data: {
            apiName: 'testAPI',
            protocol: 'http',
            host: HOST,
            port: PORT
        },
        headers: {'Content-Type':'application/json'}
    }).then((res)=>{
        console.log(res.data);
    }).catch((error) => {
        console.log(error);
    });
});
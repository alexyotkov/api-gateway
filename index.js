require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const serviceRoutes = require('./routes/service.route');
const userRoutes = require('./routes/user.route');
const gatewayRoutes = require('./routes/gateway.route');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(express.json());
app.use(helmet());
app.use('/api', gatewayRoutes);
app.use('/', serviceRoutes);
app.use('/auth', userRoutes);
app.listen(PORT, () => {
    console.log("API Gateway listening on port " + PORT);
});



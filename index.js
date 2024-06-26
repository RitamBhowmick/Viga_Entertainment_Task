const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database.js');
const { swaggerServe, swaggerSetup } = require("./config/swagger.config.js");
const dotenv = require('dotenv').config();
const app = express();

// Test the database connection
sequelize.authenticate()
.then(() => {
console.log('Connection has been established successfully.');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});
sequelize.sync();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const organizationRouter = require('./route/organization.route.js')
const itemRouter = require('./route/item.route.js')
const pricingRouter = require('./route/pricing.route.js')

app.get('/', (req, res) => res.status(200).send('Welcome To Food Delivery App'));
app.use('/api/organization', organizationRouter);
app.use('/api/item',itemRouter);
app.use('/api/pricing',pricingRouter);
app.use("/api-docs", swaggerServe, swaggerSetup)

app.listen(process.env.SERVER_PORT, () => console.log("Server is running: " + process.env.SERVER_PORT))

module.exports = app;

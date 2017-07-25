"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var customer_route_1 = require("./routes/customer-route");
var customer_service_1 = require("./services/customer-service");
var app = express();
var port = process.env.PORT || 3000;
var customerService = new customer_service_1.CustomerService();
var customerRoute = new customer_route_1.CustomerRoute(customerService);
app.get('/customers/:id', customerRoute.getCustomers);
app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});

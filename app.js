"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var customerRoute = require("./routes/customer-route");
var app = express();
var port = process.env.PORT || 3000;
app.get('/customers', customerRoute.getCustomers);
app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});

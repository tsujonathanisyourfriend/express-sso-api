"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerRoute = (function () {
    function CustomerRoute(customerService) {
        this.customerService = customerService;
    }
    CustomerRoute.prototype.getCustomers = function (req, res) {
        var id = req.params['id'];
        console.log(id);
        var customers = this.customerService.getCustomers();
        res.json(customers);
    };
    return CustomerRoute;
}());
exports.CustomerRoute = CustomerRoute;

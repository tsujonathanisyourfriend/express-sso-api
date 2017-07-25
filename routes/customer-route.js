"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCustomers(req, res) {
    var result = [{
            id: 1,
            name: 'John Smith',
            address: 'Downtown Montreal'
        }, {
            id: 2,
            name: 'Tiger Woods',
            address: 'New York'
        }];
    res.json(result);
}
exports.getCustomers = getCustomers;

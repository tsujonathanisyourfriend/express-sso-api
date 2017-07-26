import * as express from 'express';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer-service';

export class CustomerRoute {
    private customerService: CustomerService;

    public constructor(customerService: CustomerService) {
        this.customerService = customerService;
    }

    public getCustomers = (req: express.Request, res: express.Response): void => {
        let id = req.params['id'];
        let customers = this.customerService.getCustomers();
        res.json(customers);
    };
}
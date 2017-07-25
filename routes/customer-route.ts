import * as express from 'express';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer-service';

export class CustomerRoute {
    public constructor(private customerService: CustomerService) {
    }

    public getCustomers(req: express.Request, res: express.Response): void {
        let id = req.params['id'];
        console.log(id);
        let customers = this.customerService.getCustomers();
        res.json(customers);
    }
}
import * as express from 'express';
import { ICustomerService } from '../services/customer-service';

export interface ICustomerRoute {
    getCustomers(req: express.Request, res: express.Response): void;
}

export class CustomerRoute implements ICustomerRoute {
    public constructor(private customerService: ICustomerService) { }
                                                
    public getCustomers = (req: express.Request, res: express.Response): void => {
        let id = req.params['id'];
        let customers = this.customerService.getCustomers(+id);
        res.json(customers);
    };
}
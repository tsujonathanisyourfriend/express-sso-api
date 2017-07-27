import * as express from 'express';
import { ICustomerService } from '../services/customer-service';

export interface ICustomerRoute {
    getCustomers(req: express.Request, res: express.Response): void;
}

export class CustomerRoute implements ICustomerRoute {
    public constructor(private customerService: ICustomerService) { }
                                                
    public getCustomers = (req: express.Request, res: express.Response): void => {
        //console.log('Router level middleware. Time:', Date.now());

        const id = req.params['id'];
        this.customerService.getCustomers(+id).then(p=>{
            res.json(p);
        });
    };
}
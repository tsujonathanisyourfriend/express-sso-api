import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { ICustomerService } from '../services/customer-service';

export interface ICustomerRoute {
    getCustomers(req: express.Request, res: express.Response): void;
    login(req: express.Request, res: express.Response): void;
    validateToken(req: express.Request, res: express.Response): void;
}

export class CustomerRoute implements ICustomerRoute {
    public constructor(private customerService: ICustomerService) { }

    public getCustomers = (req: express.Request, res: express.Response): void => {
        const id = req.params['id'];
        this.customerService.getCustomers(+id).then(p => {
            res.json(p);
        });
    };

    public login = (req: express.Request, res: express.Response): void => {
        var token = jwt.sign('user', 'superSecret');

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!!!',
            token: token
        });
    };

    public validateToken = (req: express.Request, res: express.Response): void => {
    }
}
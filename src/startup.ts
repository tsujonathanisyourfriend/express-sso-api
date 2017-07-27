import * as express from 'express';
import * as morgan from 'morgan';
import * as core from "express-serve-static-core";
import { ICustomerRoute, CustomerRoute } from './routes/customer-route';
import { ICustomerService, CustomerService } from './services/customer-service';
import { CustomerRepository } from './repositories/customer-repository';

export class StartUp {
    private app: core.Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT) || 3000;
    }

    public init() {
        this.app.use(morgan('dev'));

        this.setupJWTProtection();

        this.setupRoutes();

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            console.error(err.stack);
            res.status(500).send('Something broke!');
        });

        this.app.listen(this.port, function () {
            console.log('Running on PORT: ' + this.port);
        });
    }

    private setupRoutes(): void {
        const customerRepository: CustomerRepository = new CustomerRepository();
        const customerService: ICustomerService = new CustomerService(customerRepository);
        const customerRoute: ICustomerRoute = new CustomerRoute(customerService);
        this.app.get('/customers/:id', customerRoute.getCustomers);
        this.app.get('/authenticate', customerRoute.authenticate);        
    }

    private setupJWTProtection(): void {
    }
}
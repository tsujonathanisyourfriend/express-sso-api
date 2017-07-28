import * as express from 'express';
import * as morgan from 'morgan';
import * as core from "express-serve-static-core";
import * as jwt from 'jsonwebtoken';
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

        //this.setupJWTProtection();

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            next();
        });

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
        this.app.get('/api/customers/:id', customerRoute.getCustomers);
        this.app.get('/authenticate', customerRoute.login);
    }

    private setupJWTProtection(): void {
        const apiRoutes: core.Router = express.Router();

        // route middleware to verify a token
        apiRoutes.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {

            // check header or url parameters or post parameters for token
            const token = !!req.headers['x-access-token'] ? req.headers['x-access-token'].toString() : undefined;

            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, 'superSecret', function (err, decoded) {
                    if (err) {
                        return res.json({ success: false, message: 'Failed to authenticate token.' });
                    } else {
                        // if everything is good, save to request for use in other routes
                        // req.decoded = decoded;
                        next();
                    }
                });

            } else {
                // if there is no token
                // return an error
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });

            }
        });

        // apply the routes to our application with the prefix /api
        this.app.use('/api', apiRoutes);
    }
}
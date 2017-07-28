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

        this.setupCORS();

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

    private setupCORS(): void {
        var allowCrossDomain = function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

            // intercept OPTIONS method
            if ('OPTIONS' == req.method) {
                res.send(200); 
            }
            else {
                next();
            }
        };

        this.app.use(allowCrossDomain);
    }

    private setupJWTProtection(): void {
        var protectApi = function(req: express.Request, res: express.Response, next: express.NextFunction) {
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
        };

        const apiRoutes: core.Router = express.Router();

        // route middleware to verify a token
        apiRoutes.use(protectApi);

        // apply the routes to our application with the prefix /api
        this.app.use('/api', apiRoutes);
    }

    private setupRoutes(): void {
        const customerRepository: CustomerRepository = new CustomerRepository();
        const customerService: ICustomerService = new CustomerService(customerRepository);
        const customerRoute: ICustomerRoute = new CustomerRoute(customerService);
        this.app.get('/api/customers/:id', customerRoute.getCustomers);
        this.app.get('/authenticate', customerRoute.login);
    }
}
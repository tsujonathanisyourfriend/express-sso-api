import * as express from 'express';
import { ICustomerRoute, CustomerRoute } from './routes/customer-route';
import { ICustomerService, CustomerService } from './services/customer-service';
import * as morgan from 'morgan';
import { CustomerRepository } from './repositories/customer-repository';

let app = express();
let port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    //console.log('Application level middleware. Time:', Date.now());
    next();
});

var customerRepository: CustomerRepository = new CustomerRepository();
let customerService: ICustomerService = new CustomerService(customerRepository);
let customerRoute: ICustomerRoute = new CustomerRoute(customerService);
app.get('/customers/:id', customerRoute.getCustomers);

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});
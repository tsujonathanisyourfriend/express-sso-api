import * as express from 'express';
import * as morgan from 'morgan';
import { ICustomerRoute, CustomerRoute } from './routes/customer-route';
import { ICustomerService, CustomerService } from './services/customer-service';
import { CustomerRepository } from './repositories/customer-repository';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

const customerRepository: CustomerRepository = new CustomerRepository();
const customerService: ICustomerService = new CustomerService(customerRepository);
const customerRoute: ICustomerRoute = new CustomerRoute(customerService);
app.get('/customers/:id', customerRoute.getCustomers);
app.get('/authenticate', customerRoute.authenticate);

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function () {
    console.log('Running on PORT: ' + port);
});
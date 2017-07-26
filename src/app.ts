import * as express from 'express';
import { ICustomerRoute, CustomerRoute } from './routes/customer-route';
import { ICustomerService, CustomerService } from './services/customer-service';

let app = express();
let port = process.env.PORT || 3000;

let customerService: ICustomerService = new CustomerService();
let customerRoute: ICustomerRoute = new CustomerRoute(customerService);
app.get('/customers/:id', customerRoute.getCustomers);

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});
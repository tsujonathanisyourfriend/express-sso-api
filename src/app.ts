import * as express from 'express';
import { CustomerRoute } from './routes/customer-route';
import { CustomerService } from './services/customer-service';

let app = express();
let port = process.env.PORT || 3000;

let customerService = new CustomerService();
let customerRoute = new CustomerRoute(customerService);
app.get('/customers/:id', customerRoute.getCustomers);

app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});
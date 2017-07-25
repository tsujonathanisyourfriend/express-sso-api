import * as express from 'express';
import * as customerRoute from './routes/customer-route';

let app = express();
let port = process.env.PORT || 3000;
app.get('/customers', customerRoute.getCustomers);
app.listen(port, function() {
    console.log('Running on PORT: ' + port);
});
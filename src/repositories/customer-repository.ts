import * as mongoose from 'mongoose';
import { Customer } from '../models/customer';
import * as _ from 'lodash';

export class CustomerRepository {
    private customerModel: mongoose.Model<mongoose.Document>;

    constructor() {
        let schema = new mongoose.Schema({ id: Number, name: String, password: String });
        this.customerModel = mongoose.model('Customer', schema);

        let database = mongoose.connection;
        database.once('open', function () {
            console.log('Connected to mongo!');
        });

        mongoose.connect('mongodb://localhost:27019/price-sheet');

        const self = this;
        this.customerModel.find({}, (err, customers) => {
            if (customers.length == 0) {
                let document = new self.customerModel({ id: 1, name: 'Geoge Bush', password: '123' });
                document.save();

                document = new self.customerModel({ id: 2, name: 'James Bond', password: '123' });
                document.save();

                document = new self.customerModel({ id: 3, name: 'Tom Hanks', password: '123' });
                document.save();
            }
        });
    }

    public getAllCustomers(): Promise<Array<Customer>> {
        return new Promise<Array<Customer>>(
            (resolve: (value: Array<Customer>) => void,
                reject: (err?: any) => void) => {
                this.customerModel.find({}, function (err, customerDocuments) {
                    var result = [];
                    _.forEach(customerDocuments, (item) => {
                        const customer = new Customer((<any>item).id, (<any>item).name, (<any>item).password);
                        result.push(customer);
                    });
                    resolve(result);
                });
            });
    }
}
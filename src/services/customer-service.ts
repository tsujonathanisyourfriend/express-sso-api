import { Customer } from '../models/customer';

export class CustomerService {
    public getCustomers(): Array<Customer> {
        let result = [{
            id: 1,
            name: 'John Smith',
            address: 'Downtown Montreal'
        }, {
            id: 2,
            name: 'Tiger Woods',
            address: 'New York'
        }];
        return result;
    }
}
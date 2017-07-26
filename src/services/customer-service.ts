import { Customer } from '../models/customer';
import * as _ from 'lodash';

export interface ICustomerService {
    getCustomers(id?: number): Array<Customer>;
}

export class CustomerService implements ICustomerService {
    public getCustomers(id?: number): Array<Customer> {
        let allCustomers = [{
            id: 1,
            name: 'John Smith',
            address: 'Downtown Montreal'
        }, {
            id: 2,
            name: 'Tiger Woods',
            address: 'New York'
        }];

        if (id === undefined) {
            return allCustomers;
        }

        let result = _.find(allCustomers, p => p.id === id);
        return [result];
    }
}
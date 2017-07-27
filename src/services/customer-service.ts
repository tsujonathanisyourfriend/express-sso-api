import { Customer } from '../models/customer';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { CustomerRepository } from '../repositories/customer-repository';

export interface ICustomerService {
    getCustomers(id?: number): Promise<Array<Customer>>;
}

export class CustomerService implements ICustomerService {
    constructor(private customerRepository: CustomerRepository) {
    }

    public getCustomers(id?: number): Promise<Array<Customer>> {  
        return this.customerRepository.getAllCustomers();
        
        // let allCustomers = [{
        //     id: 1,
        //     name: 'John Smith',
        //     password: 'Downtown Montreal'
        // }, {
        //     id: 2,
        //     name: 'Tiger Woods',
        //     password: 'New York'
        // }];

        // if (id === undefined) {
        //     return allCustomers;
        // }

        // let result = _.find(allCustomers, p => p.id === id);

        // return [result];
    }
}
import * as express from 'express';

export function getCustomers(req: express.Request, res: express.Response) {
    let result = [{
        id: 1,
        name: 'John Smith',
        address: 'Downtown Montreal'
    }, {
        id: 2,
        name: 'Tiger Woods',
        address: 'New York'
    }];

    res.json(result);
}
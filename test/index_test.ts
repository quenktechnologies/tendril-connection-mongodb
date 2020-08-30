import { MongoClient } from 'mongodb';

import { assert } from '@quenk/test/lib/assert';
import {
    attempt,
    toPromise,
    doFuture
} from '@quenk/noni/lib/control/monad/future';

import { MongoDBConnection } from '../lib';

const MONGO_URI = process.env.MONGO_URI || 
  'mongodb://localhost/tendril-connection-mongodb';

const client = new MongoClient(MONGO_URI);

describe('MongoDBConnection', () => {

    describe('open()/close()', () => {

        it('should open a connection', () => toPromise(doFuture(function*() {

            yield attempt(() => assert(client.isConnected()).false());

            let conn = new MongoDBConnection(client);

            yield conn.open();

            yield attempt(() => assert(client.isConnected()).true());

            yield conn.close();

            return attempt(() => assert(client.isConnected()).false());

        })))

    });

    after(() => client.isConnected() ? client.close() : Promise.resolve());

});

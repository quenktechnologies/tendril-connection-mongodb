import * as conn from '@quenk/tendril/lib/app/connection';
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { Future, pure, fromCallback } from '@quenk/noni/lib/control/monad/future';

/**
 * MongoDBConnection Connection implementation.
 *
 * This uses a single MongoClient and checkouts individual db references.
 */
export class MongoDBConnection implements conn.Connection {

    constructor(public client: MongoClient) { }

    open(): Future<conn.Connection> {

        return fromCallback(cb => this.client.connect(cb))
            .map(() => <conn.Connection>this);

    }

    checkout(): Future<Db> {

        return pure((this.client).db());

    }

    close(): Future<void> {

        return fromCallback(cb => (this.client).close(cb));

    }

}

/**
 * connector for creating Connections to a MongoDB instance.
 */
export const connector = (url: string, opts: MongoClientOptions = {})
    : MongoDBConnection => new MongoDBConnection(new MongoClient(url, opts));

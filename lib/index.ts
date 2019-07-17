import * as conn from '@quenk/tendril/lib/app/connection';
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { Future, pure, fromCallback } from '@quenk/noni/lib/control/monad/future';

/**
 * Connection implementation for the MongoClient.
 *
 * This uses a single MongoClient and checkouts individual db references.
 * XXX: Note all the usages of <any> here are because the current types
 * are outdated (v 2.x.x).
 */
export class Connection implements conn.Connection {

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
    : Connection => new Connection(new MongoClient(url, opts));

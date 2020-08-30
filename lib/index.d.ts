import * as conn from '@quenk/tendril/lib/app/connection';
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { Future } from '@quenk/noni/lib/control/monad/future';
/**
 * MongoDBConnection Connection implementation.
 *
 * This uses a single MongoClient and checkouts individual db references.
 */
export declare class MongoDBConnection implements conn.Connection {
    client: MongoClient;
    constructor(client: MongoClient);
    open(): Future<void>;
    checkout(): Future<Db>;
    close(): Future<void>;
}
/**
 * connector for creating Connections to a MongoDB instance.
 */
export declare const connector: (url: string, opts?: MongoClientOptions) => MongoDBConnection;

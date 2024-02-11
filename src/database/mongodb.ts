import { promises } from "dns";
import dotenv from "dotenv";
import { MongoClient, MongoClientOptions, Collection, Db } from "mongodb";
import { Signale } from "signale";

dotenv.config();

const signale = new Signale();
const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions);

let collection: Collection;

export async function connect(collectionName: string): Promise<Collection|null>{
    try {
        await client.connect();
        signale.success('Conexion a la base de datos exitosa');
        return client.db().collection(collectionName);
    } catch (error) {
        signale.error(error);
        return null;
    }
}

export { collection };

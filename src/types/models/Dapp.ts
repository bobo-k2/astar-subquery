// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class Dapp implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public eraId: string;

    public developer: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Dapp entity without an ID");
        await store.set('Dapp', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Dapp entity without an ID");
        await store.remove('Dapp', id.toString());
    }

    static async get(id:string): Promise<Dapp | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Dapp entity without an ID");
        const record = await store.get('Dapp', id.toString());
        if (record){
            return Dapp.create(record);
        }else{
            return;
        }
    }


    static async getByEraId(eraId: string): Promise<Dapp[] | undefined>{
      
      const records = await store.getByField('Dapp', 'eraId', eraId);
      return records.map(record => Dapp.create(record));
      
    }


    static create(record: Partial<Omit<Dapp, FunctionPropertyNames<Dapp>>> & Entity): Dapp {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Dapp(record.id);
        Object.assign(entity,record);
        return entity;
    }
}

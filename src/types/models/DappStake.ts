// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class DappStake implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public dappId: string;

    public amount: bigint;

    public staker: string;

    public eraId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DappStake entity without an ID");
        await store.set('DappStake', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DappStake entity without an ID");
        await store.remove('DappStake', id.toString());
    }

    static async get(id:string): Promise<DappStake | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DappStake entity without an ID");
        const record = await store.get('DappStake', id.toString());
        if (record){
            return DappStake.create(record);
        }else{
            return;
        }
    }


    static async getByDappId(dappId: string): Promise<DappStake[] | undefined>{
      
      const records = await store.getByField('DappStake', 'dappId', dappId);
      return records.map(record => DappStake.create(record));
      
    }

    static async getByEraId(eraId: string): Promise<DappStake[] | undefined>{
      
      const records = await store.getByField('DappStake', 'eraId', eraId);
      return records.map(record => DappStake.create(record));
      
    }


    static create(record: Partial<Omit<DappStake, FunctionPropertyNames<DappStake>>> & Entity): DappStake {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new DappStake(record.id);
        Object.assign(entity,record);
        return entity;
    }
}

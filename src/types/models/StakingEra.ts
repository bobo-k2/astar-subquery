// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class StakingEra implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public startedAtBlockId: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StakingEra entity without an ID");
        await store.set('StakingEra', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StakingEra entity without an ID");
        await store.remove('StakingEra', id.toString());
    }

    static async get(id:string): Promise<StakingEra | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StakingEra entity without an ID");
        const record = await store.get('StakingEra', id.toString());
        if (record){
            return StakingEra.create(record);
        }else{
            return;
        }
    }


    static async getByStartedAtBlockId(startedAtBlockId: string): Promise<StakingEra[] | undefined>{
      
      const records = await store.getByField('StakingEra', 'startedAtBlockId', startedAtBlockId);
      return records.map(record => StakingEra.create(record));
      
    }


    static create(record: Partial<Omit<StakingEra, FunctionPropertyNames<StakingEra>>> & Entity): StakingEra {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StakingEra(record.id);
        Object.assign(entity,record);
        return entity;
    }
}

import { SubstrateEvent } from "@subql/types";
import { Dapp, StakingEra } from "../types";

export async function handleNewEra(event: SubstrateEvent): Promise<void> {
  const era = event.event.data[0];
  const blockHash = event.block.block.header.hash;
  logger.info('NEW ERA ' + era.toString() + ', ' + blockHash.toString());
  const record = new StakingEra(era.toString())
  record.startedAtBlockId = blockHash.toString();
  record.save();
}

export async function handleNewContract(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [developer, contract_id]
    }
  } = event;

  logger.info('NEW CONTRACT ' + contract_id.toString());
  const contract: string = JSON.parse(contract_id.toString())['evm'];
  const record = new Dapp(contract);
  record.developer = developer.toString();
  record.save();
}


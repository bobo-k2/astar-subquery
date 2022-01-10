import {SubstrateEvent} from "@subql/types";
import { StakingEra } from "../types";

export async function handleNewEra(event: SubstrateEvent): Promise<void> {
  const era = event.event.data[0];
  const blockHash = event.block.block.header.hash;
  logger.info('New era started ' + era.toString() + ', ' + blockHash.toString());
  const record = new StakingEra(era.toString())
  record.startedAtBlockId = blockHash.toString();
  record.save();
}
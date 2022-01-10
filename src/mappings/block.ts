import { SubstrateBlock } from "@subql/types";
import { Block } from '../types';

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  logger.info('Block ' + block.block.header.hash.toString() + ' ' + block.timestamp);
  let record = new Block(block.block.header.hash.toString());
  record.number = block.block.header.number.toNumber();
  record.date = block.timestamp;
  await record.save();
}
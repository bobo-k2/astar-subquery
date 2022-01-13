// Proof of concept for Astar dApps staking indexing

import { SubstrateEvent } from "@subql/types";
import { Codec } from '@polkadot/types/types';
import { Balance } from '@polkadot/types/interfaces';
import { Dapp, DappStake, StakingEra } from "../types";

const getContractAddress = (contract: Codec): string => JSON.parse(contract.toString())['evm'];

const getCurrentEra = async (): Promise<string> => {
  // For PoC purposes this is just fine, but it wont work in real life since
  // event we are currently indexing can be from some of previous eras.
  const era = await api.query.dappsStaking.currentEra();
  return era.toString();
}


export async function handleNewEra(event: SubstrateEvent): Promise<void> {
  const era = event.event.data[0];
  const blockHash = event.block.block.header.hash;
  logger.info('NEW ERA ' + era.toString() + ', ' + blockHash.toString());

  const record = new StakingEra(era.toString())
  record.startedAtBlockId = blockHash.toString();
  record.staked = BigInt(0);
  record.claimed = BigInt(0);
  await record.save();
}

export async function handleNewContract(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [developer, contract_id]
    }
  } = event;
  
  logger.info('NEW CONTRACT ' + contract_id.toString());

  const era = await getCurrentEra();
  const contract: string = getContractAddress(contract_id);
  const record = new Dapp(contract);
  record.developer = developer.toString();
  record.eraId = era;
  await record.save();
}

export async function handleStake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [staker, contract_id, value_to_stake]
    }
  } = event;
  
  logger.info('STAKE ' + staker.toString() + ', ' + contract_id.toString() + ', ' + value_to_stake.toString());
  const contract: string = getContractAddress(contract_id);
  const balance = (value_to_stake as Balance).toBigInt();
  const id = new Date().valueOf().toString() + '_' + contract;
  const era = await getCurrentEra();
  
  const record = new DappStake(id);
  record.dappId = contract;
  record.staker = staker.toString();
  record.amount = balance;
  record.eraId = era;
  await record.save();

  const stakingEra = await StakingEra.get(era.toString());
  if(stakingEra) {
    stakingEra.staked += balance;
    await stakingEra.save();
  }
}

export async function handleUnstake(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [staker, contract_id, value_to_unstake]
    }
  } = event;
  
  logger.info('UNSTAKE ' + staker.toString() + ', ' + contract_id.toString() + ', ' + value_to_unstake.toString());
  const contract: string = getContractAddress(contract_id);
  const balance = (value_to_unstake as Balance).toBigInt();
  const id = new Date().valueOf().toString() + '_' + contract;
  const era = await getCurrentEra();
  
  const record = new DappStake(id);
  record.dappId = contract;
  record.staker = staker.toString();
  record.amount = -balance;
  record.eraId = era;
  await record.save();

  const stakingEra = await StakingEra.get(era.toString());
  if(stakingEra) {
    stakingEra.claimed += balance;
    await stakingEra.save();
  }
}



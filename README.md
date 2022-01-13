# astar-subquery
SubQuery indexer for Astar network dApps staking proof of concept

- Run docker
- Run Astar node on local machine 
- To start indexing run the following commands:
  - `yarn install` to install dependencies
  - `docker-compose pull` 
  - `yarn codegen` to generate to generate data model from schema.
  - `yarn start` to start indexer

  For additional info about dApps staking check the [documentation](https://docs.astar.network/build/dapp-staking)

  For additional info about Subquery see the [documentation](https://doc.subquery.network/)

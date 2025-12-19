// shard_configuration.js
// Script to add shards to the cluster and enable sharding for database/collections.
// This script MUST be run from the mongos router.

print("--- Starting Shard Configuration ---");

// 1. Add Shards to the Cluster
print("1. Adding rs-shard01 to the cluster...");
sh.addShard("rs-shard01/shard01-a:27017,shard01-b:27017,shard01-c:27017");
print("   rs-shard01 added.");

print("2. Adding rs-shard02 to the cluster...");
sh.addShard("rs-shard02/shard02-a:27017,shard02-b:27017,shard02-c:27017");
print("   rs-shard02 added.");

// Wait a moment for shards to be registered (optional but good practice)
sleep(2000);

// 3. Enable Sharding for your database
var dbName = "road_race_shoe_db";
print("3. Enabling sharding for database '" + dbName + "'...");
sh.enableSharding(dbName);
print("   Sharding enabled for '" + dbName + "'.");

// 4. Enable Sharding for specific collections and define Shard Keys
print("\n4. Enabling sharding for collections and defining shard keys...");

// Racers Collection (Compound shard key)
print("   Sharding 'racers' collection with shard key { name: 1, address: 1 }...");
db.getSiblingDB(dbName).racers.createIndex({ name: 1, address: 1 }); // Ensure index exists
sh.shardCollection(dbName + ".racers", { name: 1, address: 1 });
print("   'racers' sharded.");

// Races Collection (Single field shard key)
print("   Sharding 'races' collection with shard key { _id: 1 }...");
db.getSiblingDB(dbName).races.createIndex({ _id: 1 }); // Ensure index exists
sh.shardCollection(dbName + ".races", { _id: 1 });
print("   'races' sharded.");

// Distributor Sales Collection (Single field shard key, chosen for common query patterns)
print("   Sharding 'distributor_sales' collection with shard key { distributor_sin_fk: 1 }...");
db.getSiblingDB(dbName).distributor_sales.createIndex({ distributor_sin_fk: 1 }); // Ensure index exists
sh.shardCollection(dbName + ".distributor_sales", { distributor_sin_fk: 1 });
print("   'distributor_sales' sharded.");

// Manufacturer Productions Collection (Single field shard key)
print("   Sharding 'manufacturer_productions' collection with shard key { manufacturer_name_fk: 1 }...");
db.getSiblingDB(dbName).manufacturer_productions.createIndex({ manufacturer_name_fk: 1 }); // Ensure index exists
sh.shardCollection(dbName + ".manufacturer_productions", { manufacturer_name_fk: 1 });
print("   'manufacturer_productions' sharded.");

// Distributor Manufacturer Contracts Collection (Single field shard key)
print("   Sharding 'distributor_manufacturer_contracts' collection with shard key { distributor_sin_fk: 1 }...");
db.getSiblingDB(dbName).distributor_manufacturer_contracts.createIndex({ distributor_sin_fk: 1 }); // Ensure index exists
sh.shardCollection(dbName + ".distributor_manufacturer_contracts", { distributor_sin_fk: 1 });
print("   'distributor_manufacturer_contracts' sharded.");

print("\n--- Shard Configuration Complete. ---");
print("You can now connect to mongos and verify with 'sh.status()' or proceed to data operations.");

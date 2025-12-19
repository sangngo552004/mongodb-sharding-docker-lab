# 🚀 Automated MongoDB Sharding & High-Availability Cluster
This project demonstrates a production-grade MongoDB Sharding Cluster deployed via Docker Compose. It serves as a comprehensive lab for understanding horizontal scaling, data redundancy, and automated database orchestration.

## 🏗️ System Architecture
The infrastructure consists of 10 interconnected containers, simulating a distributed enterprise environment:

- **Mongos Router (1 node)**: Acts as the query router, providing a single interface for applications and directing operations to the appropriate shards.

- **Config Servers (3-node Replica Set)**: Maintains the cluster's metadata and configuration state with high availability.

- **Shard Servers (2 Shards, 3-node Replica Sets each)**: Actual data nodes. Each shard is a 3-node replica set (Primary-Secondary-Secondary) to ensure zero data loss and automatic failover.

## 🛠️ Technical Highlights
- **Infrastructure as Code (IaC)**: The entire 10-node cluster is defined and networked within a single docker-compose.yml, ensuring environment consistency.

- **Advanced Sharding Strategies:**

  - **Hashed Sharding**: Implemented on the racers collection to guarantee uniform data distribution across shards.

  - **Range Sharding**: Applied to the races collection using _id: 1 for optimized range-based queries.

  - **Compound Shard Keys**: Used for complex data models (e.g., name + address) to improve query targeting.

- **Granular Observability**: Configured a custom 1MB Chunk Size (reduced from the default 64MB) to trigger immediate data migrations, allowing real-time observation of the MongoDB Balancer in action.

- **Performance Optimization**: Data ingestion scripts utilize bulkWrite operations in batches of 1,000 to minimize network overhead and maximize throughput.

## 📂 Project Structure
- **docker-compose.yml**: Orchestrates the containers, networks, and persistent volumes.

- **initiate_cluster.js**: Automates the rs.initiate() process for the Config RS and both Shard RS.

- **shard_configuration.js**: Registers shards to the cluster and enables sharding for specific databases/collections.

- **schema_deployment.js**: Handles index creation and defines shard keys.

- **data_operations.js:** A stress-testing script that generates and inserts ~9,000 documents across multiple collections.

## 🚀 Quick Start
### 1. Provision Infrastructure
```
Bash 

docker-compose up -d
```
### 2. Initialize Replica Sets
Execute the initialization script on the Config server and Shard primary nodes:
```
Bash

docker exec -it cfg01 mongosh --port 27017 < initiate_cluster.js
```
### 3. Configure Sharding
Connect to the Mongos Router (Port 27018) to register shards and enable sharding:
```
Bash

docker exec -it mongos mongosh --port 27017 < shard_configuration.js
```
### 4. Load & Verify Data
Deploy the schema and run the bulk insertion script:
```
Bash

docker exec -it mongos mongosh --port 27017 < data_operations.js
```
Verify the distribution with sh.status().

## 📈 Key Learning Outcomes
- Designing high-availability clusters with Replica Sets.

- Mastering Horizontal Scaling via Sharding.

- Selecting optimal Shard Keys based on application query patterns.

- Orchestrating complex distributed systems using Docker.

*Developed as a technical laboratory for Distributed Database Systems.*

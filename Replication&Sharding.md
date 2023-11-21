# Replication and Sharding in mongoDB
In MongoDB, replication and sharding are two important features designed to address scalability, fault tolerance, and performance issues in large-scale distributed database systems.

## Replication (https://youtu.be/LqCEp1PmfgY?si=JVywtzFLEhTodtYj)
Replication in MongoDB involves maintaining multiple copies of data across different servers. This is done to ensure data availability, fault tolerance, and disaster recovery. In a replica set, there is a primary node that processes all write operations and one or more secondary nodes that replicate the data from the primary. If the primary node fails, one of the secondaries can be automatically promoted to primary to ensure continuous service.

## Sharding (https://youtu.be/bSulWZtc2n8?si=QLrk05amdhl87WI7)
Sharding is a technique used to horizontally partition data across multiple servers or shards. Each shard is an independent database, and together they form a logically single database system. Sharding is particularly useful for distributing large datasets and workload across multiple servers, improving read and write throughput.
### Sharding syntax:
```php
use <database_name>
db.createCollection('<collection_name>')
sh.shardCollection('<database_name>.<collection_name>',{'<sharding_key>':1})
```

#### sharding key:
The key according to which sharding will be done
```php
{
    _id:1
    name:'Vipul',
    age:60
}
```
Suppose we have 3 servers and if we use `name` as sharding key then A-Z(26) will divide into 3 parts and store data in respected server

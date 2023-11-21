# Transaction in mongoDB (https://youtu.be/ErszXERETr0?si=b2-7-sSfm-iDOhGZ)
- A transaction is a set of operations that are executed as a single, atomic unit.
- Transactions provide data consistency by ensuring that either all the operations within the transaction are committed to the database, or none ot them are.
- Transactions are designed to provide ACID properties. 
- When it comes to transactions, replication is crucial for maintaining the consistency and durability guarantees across multiple documents and collections involved in a transaction.

### Transactions syntax and example 
```javascript
var session = db.getMongo().startSession();

session.startTransaction();

var cust = session.getDatabase('bank').cust;
cust.updateOne({_id:1}, {$inc:{bal:-100}});

cust.updateOne({_id:2}, {$inc:{bal: 100}});

session.commitTransaction(); / session.abortTransaction();

session.endSession();
```
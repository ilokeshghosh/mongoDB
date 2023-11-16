# Join

#### Types of Join

- Inner Join : Returns records that have matching values in both tables
- Left (Outer) Join : Returns all records from the left table, and the matched records from the right table
- Right (Outer) Join : Returns all records from the right table, and the matched records from the left table
- Full Outer Join : Returns all records when there is a match in either left or right table

### `$lookup` :

The `$lookup` is an aggregation pipeline stage that allows you to perform a left outer join between two collections.

#### Syntax:

```php
db.collection.aggregate([
    {
        $lookup:{
            from: 'foreignCollection',
            localField: 'localField',
            foreignField:'foreignField',
            as:'outputArray'
        }
    }
])
```

<!-- data set -->
### Data set
```php
// order collection
products> db.orders.find()
[
  { _id: 1, order_number: 'ORD001', customer_id: 101 },
  { _id: 2, order_number: 'ORD002', customer_id: 102 },
  { _id: 3, order_number: 'ORD003', customer_id: 103 }
]

// customer collection
products> db.cust.find()
[
  { _id: 101, name: 'John Doe', email: 'john@example.com' },
  { _id: 102, name: 'Emily Smith', email: 'emily@example.com' },
  { _id: 104, name: 'Jane Anderson', email: 'jane@example.com' }
]
```

### Left Join
<!-- left join -->
```php
 db.cust.aggregate([{$lookup:{ from:'orders', localField:'_id', foreignField:'customer_id', as:'outputArray'}}])
```

### Right join
<!-- right join -->
```php
db.orders.aggregate([{$lookup:{ from:'cust', localField:'customer_id', foreignField:'_id', as:'outputArray'}}]).pretty()
```

### Full Outer Join
```php
db.cust.aggregate([{$lookup:{ from:'orders', localField:'_id', foreignField:'customer_id', as:'outputArray'}}, {$match:{$expr:{$ne:['$outputArray',[]]}}}]).pretty()
```
# Indexes

### Create Index

```php
  db.students.createIndex({name:1}) // 1 for ascending order and -1 for descending order
```

### Get Indexes

```php
  db.students.getIndexes()
```

### Drop Index

```php
  db.students.dropIndexes('name_1')
```


### <mark>Note</mark> :

### without indexing :Process of finding document is call Collection Scan(`Collscan`)

### with indexing : Process of finding document is call Index Scan(`IXSCAN`)

### Note on index:

- Indexes are stored in a B-tree data structure.
- It stores
  - Index Keys
  - Pointers to the documents in the collection
- When a query is executed, MongoDB can use the index to quickly locate the documents that match the query by searching through the B-tree(Balanced tree).

#### The Trade-off

- storage space
- write performance

#### There are several types of indexed available in MongoDB

- Single field indexes
- Compound indexes
- Text indexes

#### When not to use indexing in mongodb?

- When the collections is small
- When the collections is frequently updated
- When the queries are complex(multiple fields)
- When the collection is large(make less indexes)

## Compound Indexes(order matters)

```php
db.students.createIndex({age:1, gender:1})

// find by both age and gender
db.students.find({age:{$gte:27}, gender:'Male'}).explain('executionStats')
//  stage: 'IXSCAN',

// find by only age
 db.students.find({age:{$gte:27}}).explain('executionStats')
// stage: 'IXSCAN',

// find by only gender
db.students.find({gender:'Male'}).explain('executionStats')
// stage: 'COLLSCAN',

$Takeout:`In compound indexing(age_1_gender_1) documents is 1st sorted by age then by gender. So we can perform indexScan only by age but cannot perform indexScan only by gender`
```

### Create Advance index

```php
// create unique index
db.students.createIndex({name:1}, {unique:true})

// partial filter
db.students.createIndex({age:1}, {partialFilterExpression:{age:{$gt:22}}})  //index will apply to only those, whose age is greater than 22
db.students.createIndex({age:1}, {partialFilterExpression:{gender:{$exists:true}}}) //index will apply to only those, who have gender field

// TTL(Time To Live) indexing (not recommended to use) ,this works on date fields and on single field index
db.collections.createIndex({'field':1}, {expireAfterSeconds:1000})
```

### Covered Query

- All the fields in the query are part of an index.
- All the fields returned in the query are in the same index

```php
 db.students.find({name:'Ginni Folli'},{name:1, _id:0})

db.students.find({name:'Ginni Folli'},{name:1, _id:0}).explain('executionStats')
 // stage: 'PROJECTION_COVERED',

db.students.find({name:'Ginni Folli'}).explain('executionStats')
//stage: 'FETCH'
```

### Winning Plan

```php
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { name: 1 }, name: 'name_1' },
  { v: 2, key: { name: 1, age: 1 }, name: 'name_1_age_1' }
]
```

#### In case of multiple indexes

- MongoDB checks the performance of index on a sample of documents once the queries are run and set it as Winning plan.
- Then for second query of similar type it doesn't race them again.
- It store that winning plan in cache

#### Cache is reset after

- After 1000 writes
- Index is reset
- Mongo server is restarted
- Other indexes are manipulated

```php
db.students.find({name:'Ulrike Mariet'}).explain('allPlansExecution')
//shows the rejected plan and winning plan
```

### Display the query stats

```php
db.students.find({age:{$lte:30}}).explain()
db.students.find({age:{$lte:30}}).explain('executionStats')
```

## Multi-key Index

- A multi-key index is an index that can be created on an array field
- Mongodb will create a separate index entry for each value in each array.
- so it can quickly look up documents that match a specific value.

```php
{
        name: 'Sam',
        Hobbies: ['Walk', 'Gym'],
        identity: { hasPanCard: true, hasAdhaarCard: false },
        bio: 'i am human',
        experience: [
            { company: 'Apple', duration: 3 },
            { company: 'Microsoft', duration: 0.2 }

        ],
        age: 23
}
db.students.createIndex({Hobbies:1})
db.students.find({Hobbies:'walk'}).explain();
```

## Text Index

- Single Text Index per Collection
- Tokenization and Stemming
- Relevance Score

```php
// create index
db.students.createIndex({name:'text'})
db.students.createIndex({name:'text', bio:'text'})

//find data
 db.students.find({$text:{$search:'solution'}})


//  display score
db.students.find({$text:{$search:'solution brand'}}, {myScore:{$meta:'textScore'}})
 db.students.find({$text:{$search:'Keri solution -brand'}}, {myScore:{$meta:'textScore'}})

// document does not contain brand in bio field
db.students.find({$text:{$search:'solution -brand'}}, {myScore:{$meta:'textScore'}})

// setting priority
db.students.createIndex({name:'text',bio:'text'}, {weights:{name:1000, bio:1}})

//sort by score
db.students.find({$text:{$search:'solution brand'}}, {myScore:{$meta:'textScore'}}).sort({myScore:{$meta:'textScore'}})

//while creating index collection will be locked to avoid this we can use :
db.students.createIndex({name:'text',bio:'text'}, {background:true}) //it will only block those query which is depended on the index
```


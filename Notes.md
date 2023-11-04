# Configuration and Start Sever
### start mongo daemon
```php
 sudo systemctl start mongod
```

### status of mongo server
```php
 sudo systemctl status mongod
```
### stop mongo daemon
```php
 sudo systemctl stop mongod
```
### start mongosh shell
```php
 mongosh
```



# Collections
### Show Collection
```php
show collections
```
### Create a Collection
#### Default Collection Creation
```php
db.createCollection('teachers')
```

#### Customized Collection Creation
```php
db.createCollection('teachers', {capped:true, size:10000000, max:100}, {autoIndexId:false})
```

## validation

#### Customized Collection Creation with validation
```php
db.createCollection('nonfiction',{
    validator:{
        $jsonSchema:{
            required:['name', 'price'],
            properties:{
                name:{
                    bsonType:'string',
                    description:'must be a string and required'
                },
                price:{
                    bsonType:'number',
                    description:'must be a number and required'
                }
            }
        }
    },
    validationAction: 'error'
})

// to paste in shell
db.createCollection('nonfiction',{validator:{$jsonSchema:{required:['name', 'price'],properties:{name:{bsonType:'string',description:'must be a string and required'},price:{bsonType:'number',description:'must be a number and required'}}}},validationAction: 'error'})
```

#### Modify a collection validation
```php

// collMod : collection modifier
db.runCommand({
    collMod: 'nonfiction',
    validator: {
        $jsonSchema: {
            required: ['name', 'price', 'authors'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and required'

                },
                price: {
                    bsonType: 'number',
                    description: 'must be a number and required'
                },
                authors: {
                    bsonType: 'array',
                    description: "must be a array types",
                    items: {
                        bsonType: ['object'],
                        required: ['name', 'email'],
                        properties: {
                            name: {
                                bsonType: 'string',
                                description: 'author name must be in string'

                            },
                            email: {
                                bsonType: 'string',
                                description: 'author email must be in string'
                            }
                        }
                    }
                }
            }
        }
    },
    validationAction: 'error'
})

//to paste in shell
db.runCommand({collMod: 'nonfiction',validator: {$jsonSchema: {required: ['name', 'price', 'authors'],properties: {name: {bsonType: 'string',description: 'must be a string and required'},price: {bsonType: 'number',description: 'must be a number and required'},authors: {bsonType: 'array',description: "must be a array types",items: {bsonType: ['object'],required: ['name', 'email'],properties: {name: {bsonType: 'string',description: 'author name must be in string'},email: {bsonType: 'string',description: 'author email must be in string'}}}}}}},validationAction: 'error'})

```

### Drop a Collections
```php
db.courses.drop()
```

# Inert Data
### Inert One
```php
  db.students.insertOne({name:'Joey', age:30, gpa:4.5, fullTime:false})

```

### Insert with `concern`
```php
db.books.insertOne({name:'D', price:4},{writeConcern:{w:0, j:true, wtimeout:1000}})
{w:<value>, j:<boolean>, wtimeout:<number>}
//w(acknowledgement): request acknowledgement on task completion  
//j(journal): write the data about task to recover the system failure 
//wtimeout: setting timeout for any operation
```

### Insert Many
```php
  db.students.insertMany[{name:'Zyan', age:29, gpa:6.3, fullTime:true}, {name:'Jack', age:33, gpa:9.8, fullTime:false}, {name:'Harry', age:40, gpa:9.3, fullTime:true},{name:'Julia', age:27, gpa:4.5, fullTime:false}]

```
### Insert Many(`.insertMany({data},{options})`) with `ordered`
`insertMany()` inserts data in ordered manner , we can mark the order as `false`
```php
db.students.insertMany([
{name:'Zyan', age:29, gpa:6.3, fullTime:true}, 
{name:'Jack', age:33, gpa:9.8, fullTime:false}], {ordered:false})
```



# Sorting and limiting and Skipping
### Sorting
#### Sorting(ASC)
```php
db.students.find().sort({name:1})
```
#### Sorting(DESC)
```php
db.students.find().sort({name:-1})
```

### Limiting
```php
db.students.find().limit(1)
```
### Combining Sorting and Limiting
```php
db.students.find().sort({gpa:-1}).limit(1)
```
### Combining Skip with Limit
```php
db.students.find({fullTime:true}).skip(5).limit(5)
```


# Find 

### Default Find
```php
db.students.find()
```
#### find(not findOne) return a cursor on which we can do iteration operation like:
```php
db.restaurants.find({borough:'Brooklyn'},{_id:false, name:true, cuisine:true}).forEach((x)=>{printjson(x)})
```

### Filter Find (`.find({query}, {projection})`)
```php
db.students.find({fullTime:false}, {name:true, age:true, _id:false})
```

### Find text at first
```php
db.restaurants.find({name: /^Wil/},{restaurant_id:true, name:true, borough:true, _id:false})
```

### Find text at last
```php
db.restaurants.find({name:/ces$/},{restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```
### Find text at somewhere
```php
db.restaurants.find({name:/.*Reg.*/}, {restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```
### Find certain data types
```php
db.restaurants.find({'address.coord':{$type:'double'}})
//              OR

db.restaurants.find({'address.coord':{$type:1}})
```

### Find using `$elemMatch`
```php
// $elemMatch is used find at least one element in array field in a document
db.restaurants.find({grades:{$elemMatch:{score:{$gte:90}}}})
```

### Find using `$mod` to check divisibility
```php
db.restaurants.find({'grades.score':{$mod:[7,0]}})
```
# Update
### Update One(`.updateOne(filter,update)`) using (`$set`)
```php
db.students.updateOne({name:'Joey'},{$set:{name:'Sam'}})
```

### Update One(`.updateOne(filter,update)`) using (`$unset`)
```php
db.students.updateOne({_id: ObjectId("6534da900fc6e922801f44c0")}, {$unset:{fullTime:''}})
```

### Update Many
```php
 db.students.updateMany({}, {$set:{fullTime:true}})
```

### Update Many using (`$exists`)
```php
db.students.updateMany({fullTime:{$exists:false}}, {$set:{fullTime:true}})
```



# Delete
### Delete One
```php
db.students.deleteOne({name:'Julia'})
```
### Delete Many
```php
db.students.deleteMany({fullTime:false})
```
### Delete Many using `$exists`
```php
db.students.deleteMany({registerDate:{$exists:false}})
```


# Comparison 
### Not Equals To(`!=`)
```php
  db.students.find({name: {$ne:'Harry'}})
```

### Less-than(`<`)
```php
  db.students.find({age:{$lt:30}})

```

### Less-than OR Equals To(`<=`)
```php
  db.students.find({age:{$lte:30}})
```

### Less-than OR Equals To(`<=`)
```php
  db.students.find({age:{$lte:30}})
```

### Greater-than (`>`)
```php
  db.students.find({age:{$gt:30}})

```

### Greater-than OR Equals To(`=>`)
```php
  db.students.find({age:{$gte:30}})
```

### Multiple Comparison Operator to give a range
```php
  db.students.find({gpa:{$gte:6 , $lte:10}})
```

### in operator
```php
  db.students.find({name:{$in:['Harry', 'Jack', 'Julia']}})
```

### not-in operator
```php
  db.students.find({name:{$nin:['Harry','Julia','Jack']}})
```


# Logical

### AND
```php
  db.students.find({$and:[{fullTime:true},{age:{$lte:30}}]})
```

### OR
```php
  db.students.find({$or:[{fullTime:true},{age:{$lte:30}}]})
```

### NOR
```php
  db.students.find({$nor:[{fullTime:true},{age:{$lte:30}}]})
```

### NOT
```php
  db.students.find({age:{$not:{$gte:30}}})
```

# Indexes
### Create Index
```php
  db.students.createIndex({name:1})
```

### Get Indexes
```php
  db.students.getIndexes()
```

### Drop Index
```php
  db.students.dropIndexes('name_1')
```























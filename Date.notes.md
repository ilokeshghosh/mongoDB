# Dates in mongoDB

## Code and Syntax

### Create Date

#### use ISODate

```php

 db.students.insertOne({_id:0, name:'Ram', dob:ISODate('2001-12-20')})
```

#### use ISODate with time(T) and time zone(Z)

```php

db.students.insertOne({_id:1, name:'Kamlesh', dob:ISODate('2001-12-20T14:20:23Z')})
```

#### use ISODate with time zone offset

```php
db.students.insertOne({_id:2, name:'Muklesh', dob:ISODate('2003-11-12T20:10:30+02:00')})
```

#### Current Date

```php
db.students.insertOne({_id:3, name:'Amit', dob:new Date()})
```

### Running Query

#### Data Structure

```php
 { _id: 0, name: 'Ram', dob: ISODate("2001-12-20T00:00:00.000Z") },
  { _id: 1, name: 'Kamlesh', dob: ISODate("2001-12-20T14:20:23.000Z") },
  { _id: 2, name: 'Muklesh', dob: ISODate("2003-11-12T18:10:30.000Z") }
```

#### Sort

```php
db.students.find().sort().pretty()
```

#### Aggregation Operation

(group according to year of birth)

```php
 db.students.aggregate([{$group:{_id:{$year:'$dob' }, students:{$push:'$$ROOT'}}} ]).pretty()

 //output:

 [
  {
    _id: 2001,
    students: [
      { _id: 0, name: 'Ram', dob: ISODate("2001-12-20T00:00:00.000Z") },
      {
        _id: 1,
        name: 'Kamlesh',
        dob: ISODate("2001-12-20T14:20:23.000Z")
      }
    ]
  },
  {
    _id: 2003,
    students: [
      {
        _id: 2,
        name: 'Muklesh',
        dob: ISODate("2003-11-12T18:10:30.000Z")
      }
    ]
  }
]
```

```php
db.students.aggregate(
    [
        {$match:{name:'Ram'}},
        {
            $project:{
                dayOfMonth:{$dayOfMonth:'$dob'},
                month:{$month:'$dob'},
                dayOfYear:{$dayOfYear:'$dob'},
                hour:{$hour:'$dob'},
                ms:{$millisecond:'$dob'}
                }
        }
    ])
```

##### Date in custom format

```php
    db.students.aggregate([{$project:{name:1, _id:0, dob:{$dateToString:{format:'%d/%m/%Y', date:'$dob'}}}}])

//output:

[
  { name: 'Ram', dob: '20/12/2001' },
  { name: 'Kamlesh', dob: '20/12/2001' },
  { name: 'Muklesh', dob: '12/11/2003' },
  { name: 'Amit', dob: '21/11/2023' }
]

// with time
db.students.aggregate([{$project:{name:1, _id:0, dob:{$dateToString:{format:'%d/%m/%Y %H:%M:%S', date:'$dob'}}}}])

// output :

[
  { name: 'Ram', dob: '20/12/2001 00:00:00' },
  { name: 'Kamlesh', dob: '20/12/2001 14:20:23' },
  { name: 'Muklesh', dob: '12/11/2003 18:10:30' },
  { name: 'Amit', dob: '21/11/2023 10:06:56' }
]
```

### From more aggregation date operator (https://www.mongodb.com/docs/v3.4/reference/operator/aggregation-date/)

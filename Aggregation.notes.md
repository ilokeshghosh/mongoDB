# Aggregation

- we use aggregation to write aggregate query(A pipeline operation)
- It groups the data from multiple documents into a single document based on the specified expression

## Aggregation Pipeline

- The aggregation process in MongoDB consists of several stages, each stage transforming the data in some way.
- The output of one stage is fed as the input to the next stage, and so on, until the final stage produces the desired result.
- MongoDB provides several built-in aggregation pipeline stages to perform various operations in the data,such as $group, $sum, $avg, $min, $max, etc.
- We can create pipeline as much as we want

```php
db.collection.aggregate(pipeline, options)

// find data
db.students.aggregate([{$match:{gender:'Male'}}])




// group

//


```

### Group

```php
//syntax of group:
$group:{_id:expression, field1:expression, field2:expression, ...}
```

#### Group all students according to age

```php
db.students.aggregate([{$group:{_id:'$age'}}]) //it will group all students according to age

```

#### Group all students according to age and display name of each student

```php
db.students.aggregate([{$group:{_id:'$age', name:{$push:'$name'}}}])
```

The names field uses the `$push` operator to add the name field from each document in the group to an array

#### Group students by age and also show complete document per age group

```php
db.students.aggregate([{$group:{_id:'$age', students:{$push:'$$ROOT'}}}])
```

The `$$ROOT` value is a reference to the current document being processed in the pipeline, which represents the complete document

#### Give a count per age of male students

```php
 db.students.aggregate([{$match:{gender:'Male'}}, {$group:{_id:'$age', count:{$sum:1}}}])
```

The value of $sum is 1, which means that for each document in the group, the value of 'count' will be incremented by 1

#### Give a count per age of male students and sort then by count in desc manner

```php
 db.students.aggregate([{$match:{gender:'Male'}}, {$group:{_id:'$age', count:{$sum:1}}}, {$sort:{count:-1}}])

// create a group of maximum count of a age group
 db.students.aggregate([{$match:{gender:'Male'}},{$group:{_id:'$age', count:{$sum:1}}}, {$sort:{count:-1}}, {$group:{_id:null, maxAgeGroup:{ $max:'$count' }}}])
```

### `$toDouble` operator

```php
db.students.aggregate([{$group:{_id:'$age', sumOfAges:{$sum:{$toDouble:'$age'}}}}])
```

### `$unwind`

#### Find Hobbies per age group

```php
db.students.aggregate([{$unwind:'$Hobbies'},{$group:{_id:'$age', hobbies:{$push: '$Hobbies'}}}])
```

#### Find number of students per each hobbies

```php
db.students.aggregate([{$unwind:'$Hobbies'}, {$group:{_id:'$Hobbies', count:{$sum:1}}}])
```

#### Find average age of all students

if you specify `_id:null` in the `$group` operator, it means that all the documents in the collection will be grouped together into a single group

```php
db.students.aggregate([{$group:{_id:null, averageAge:{$avg:'$age'}}}])
```

#### Find the total number of hobbies for all the students in a collection

```php
db.students.aggregate([{$unwind:'$Hobbies'}, {$group:{_id:null, count:{$sum:1}}}])

        //OR

db.students.aggregate([{$group:{_id:null, count:{$sum:{$size:{$ifNull:['$Hobbies',[]]}}}}}])
```

`$size` syntax:

```php
{$size:<expression>}
```

`$ifNull` syntax:

```php
{$ifNull:[<expression>,<replacementExpression>]}
```

#### List all hobbies

```php
db.students.aggregate([{$unwind:'$Hobbies'},{$group:{_id:null, allHabits:{$push:'$Hobbies'}}}])

        //OR
db.students.aggregate([{$unwind:'$Hobbies'},{$group:{_id:null, allHabits:{$addToSet:'$Hobbies'}}}]) //will give unique values
```

### `$filter` operator

#### Syntax:

```php
$filter:{input:<array expression>, as:<identifies>, cond:<expression>}
```

- `input`: Specifies the array expression to filter
- `as`: Specifies a variable name that can be used inside the cond expression to reference the current element of the input array.
- `cond`: Specifies the condition the must be met in order for an element to be included in the result set. The expression must return either true or false

#### Example:

```php
db.students.aggregate(
    [
        {
            $group:{
                _id:null,
                avgScore:{
                    $avg:{
                        $filter:{
                            input:'$scores',
                            as:'score',
                            cond:{gt:['$age',20]}
                        }
                    }
                }
            }
        }
    ]
)
```

### `$bucket` operator

when we want to categorize into discrete groups based on specified boundaries.

#### `$bucket` syntax :

```php
{
    $bucket:{
        groupBy:<expression>,
        boundaries:[<boundary1>, <boundary2>, ...],
        default:<expression>,
        output:{
            <outputField>:{<accumulator>:<expression>}
        }
    }
}
```

#### Categorize male students based on their ages into three buckets (`ages less than 25`), (`ages between 25 and 50`), (`ages between 50 and 75`) and (`ages above 75`).

```php
db.students.aggregate([{$match:{gender:'Male'}}, {$bucket:{ groupBy:'$age', boundaries:[0,25,50,75], default:'ages above 75', output:{count:{$sum:1}}}}])
```

`output:`

```php
[
  { _id: 0, count: 8 },
  { _id: 25, count: 15 },
  { _id: 50, count: 12 },
  { _id: 'ages above 75', count: 13 }
]
```

#### Categorize male students based on their ages into three buckets (`ages less than 25`), (`ages between 25 and 50`), (`ages between 50 and 75`) and (`ages above 75`) and display the name.

```php
db.students.aggregate([{$match:{gender:'Male'}}, {$bucket:{ groupBy:'$age', boundaries:[0,25,50,75], default:'ages above 75', output:{count:{$sum:1}, names:{$push:'$name'}}}}])
```

### `$project` operator

- It is used in the aggregation pipeline to reshape documents, include or exclude fields, and create computed fields.
- It allows you to customize the output of your aggregation query by specifying which fields to include or exclude, applying expressions to existing fields,and renaming fields.

#### Syntax:

```php
$project:{
    //field including/excluding or field transformations
}
```

#### Data set

```php
 {
    _id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 28,
    department: 'HR',
    salary: 45000,
    hireDate: ISODate("2021-11-05T00:00:00.000Z"),
    isActive: false
  }
```

#### Usage

```php
db.emp.aggregate([{$project:{firstName:1, lastName:1, _id:0}}])
db.emp.aggregate([{$project:{_id:0}}])

//rename
 db.emp.aggregate([{$project:{_id:0, dept:'$department'}}])

 db.emp.aggregate([{$project:{_id:0, lastName:1, firstName:1, monthlySalary:'$salary', annualSalary:{$multiply:[12, '$salary']}}}])
```

Link: https://www.w3resource.com/mongodb-exercises/

## Create DB and create Collection
```php
use ExercisePractice
db.createCollection('restaurants')
```

### 1. Write a MongoDB query to display all the documents in the collection restaurants.
solution:
```php
db.restaurants.find()
```

### 2. Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
solution:
```php
db.restaurants.find({},{restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```


### 3. Write a MongoDB query to display the fields restaurant_id, name, borough, and cuisine, but exclude the field _id for all the documents in the collection restaurant.
solution:
```php
db.restaurants.find({},{restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```

### 4. Write a MongoDB query to display the fields restaurant_id, name, borough, and zip code, but exclude the field _id for all the documents in the collection restaurant.
solution:
```php
db.restaurants.find({}, {restaurant_id:true, name:true, borough:true, address:{zipcode:true}, _id:false})
```

### 5. Write a MongoDB query to display all the restaurants which are in the borough Bronx.
solution:
```php
db.restaurants.find({borough:'Bronx'})
```

### 6. Write a MongoDB query to display the first 5 restaurants which are in the borough Bronx.
solution:
```php
db.restaurants.find({borough:'Bronx'}).limit(5)
```
### 7. Write a MongoDB query to display the next 5 restaurants after skipping the first 5 which are in the borough Bronx.
solution:
```php
db.restaurants.find({borough:'Bronx'}).skip(5).limit(5)
```

### 8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
solution:
```php
// $elemMatch is used find at least one element in array field in a document
db.restaurants.find({grades:{$elemMatch:{score:{$gte:90}}}})
```
### 9. Write a MongoDB query to find the restaurants that achieved a score more than 80 but less than 100.
solution:
```php
db.restaurants.find({grades:{$elemMatch:{score:{$gt:80, $lt:100}}}})
```

### 10. Write a MongoDB query to find the restaurants which are located in latitude values less than -95.754168.
solution:
```php
db.restaurants.find({'address.coord':{$lt: -95.754168}})

```

### 11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and their grade score is more than 70 and latitude is less than -65.754168.
solution:
```php
ExercisePractice> db.restaurants.find({$and:[{cuisine:{$ne:'American '}},{grades:{$elemMatch:{score:{$gt:70}}}},{'address.coord':{$lt:-65.754168}}]})
```
### 12. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and achieved a score more than 70 and located in longitude less than -65.754168. `Note`: Do this query without using $and operator.
solution:
```php
db.restaurants.find( { cuisine:{$ne:'American '}, grades:{$elemMatch:{score:{$gt:70}}}, 'address.coord':{$lt:-65.754168}})
```

### 13. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and achieved a grade point 'A' not belonging to the borough Brooklyn.
solution:
```php
db.restaurants.find({cuisine:{$ne:'American '}, grades:{$elemMatch:{grade:'A'}}, borough:{$ne:'Brooklyn'}}).sort({cuisine:-1})
```
### 14. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which contain 'Wil' as the first three letters in its name.
solution:
```php
db.restaurants.find({name: /^Wil/},{restaurant_id:true, name:true, borough:true, _id:false})
```
### 15. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which contain 'ces' as the last three letters in its name.
solution:
```php
db.restaurants.find({name:/ces$/},{restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```
### 16. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
solution:
```php
db.restaurants.find({name:/.*Reg.*/}, {restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```
### 17. Write a MongoDB query to find the restaurants that belong to the borough Bronx and prepare either American or Chinese dishes.
solution:
```php
db.restaurants.find({borough:'Bronx' , $or:[{cuisine:'American '}, {cuisine:'Chinese'}]})
```
### 18. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which belong to the borough Staten Island, Queens, Bronx, or Brooklyn.
solution:
```php
db.restaurants.find({borough:{$in:['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}})
```
### 19. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which do not belong to the borough Staten Island, Queens, Bronx, or Brooklyn.
solution:
```php
db.restaurants.find({borough:{$nin:['Staten Island', 'Queens', 'Bronx', 'Brooklyn']}},{restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```
### 20. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which achieved a score that is not more than 10.
solution:
```php
db.restaurants.find({'grades.score':{$lte:10}}, {restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})

        //OR
db.restaurants.find({'grades.score':{$not:{$gt:10}}}, {restaurant_id:true, name:true, borough:true, cuisine:true, _id:false})
```
//to check
### 21. Write a MongoDB query to find the restaurant Id, name, borough, and cuisine for those restaurants which prepare dishes except 'American' and 'Chinese' or restaurants whose name begins with the letter 'Wil'.
solution:
```php
db.restaurants.find({name:/^Wil/, cuisine:{$nin:['American ', 'Chinese']}},{_id:false, restaurant_id:true, name:true, borough:true, cuisine:1})
```
### 22. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z."
solution:
```php
db.restaurants.find({'grades.grade':'A', 'grades.score':11, 'grades.date':ISODate('2014-08-11T00:00:00Z')},{restaurant_id:true, name:true, grades:true, _id:false})
```
### 23. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants where the 2nd element of the grades array contains a grade of "A" and a score of 9 on an ISODate "2014-08-11T00:00:00Z."
solution:
```php
db.restaurants.find({'grades.1.grade':'A', 'grades.1.score':9, 'grades.1.date':ISODate('2014-08-11T00:00:00Z')},{restaurant_id:true, name:true, grades:true})
```
### 24. Write a MongoDB query to find the restaurant Id, name, address, and geographical location for those restaurants where the 2nd element of the coord array contains a value which is more than 42 and up to 52.
solution:
```php
 db.restaurants.find({'address.coord.1':{$gt:42, $lte:52}},{restaurant_id:true, name:true, 'address':1})
```
### 25. Write a MongoDB query to arrange the names of the restaurants in ascending order along with all the columns.
solution:
```php
db.restaurants.find().sort({name:1})
```
### 26. Write a MongoDB query to arrange the names of the restaurants in descending order along with all the columns.
solution:
```php
db.restaurants.find().sort({name:-1})
```
### 27. Write a MongoDB query to arrange the names of the cuisine in ascending order, and for that same cuisine, the borough should be in descending order.
solution:
```php
db.restaurants.find().sort({cuisine:1, borough:-1})
```
### 28. Write a MongoDB query to determine whether all the addresses contain the word "street" or not.
solution:
```php
db.restaurants.find({'address.street':{$exists:true}})
```
### 29. Write a MongoDB query to select all documents in the restaurants collection where the coord field value is Double.
solution:
```php
db.restaurants.find({'address.coord':{$type:'double'}})
//              OR

db.restaurants.find({'address.coord':{$type:1}})
```
### 30. Write a MongoDB query to select the restaurant Id, name, and grades for those restaurants where the score divided by 7 results in a remainder of 0.
solution:
```php
db.restaurants.find({'grades.score':{$mod:[7,0]}}, {_id:false, restaurant_id:true, name:true, grades:true})
```
### 31. Write a MongoDB query to find the restaurant name, borough, longitude, and latitude, and cuisine for those restaurants which contain 'mon' as three letters somewhere in its name.
solution:
```php
db.restaurants.find({name:/.*mon.*/},{name:true, borough:true, cuisine:true,'address.coord':true, _id:false})
```
### 32. Write a MongoDB query to find the restaurant name, borough, longitude, and latitude, and cuisine for those restaurants which contain 'Mad' as the first three letters of its name.
solution:
```php
db.restaurants.find({name:/^Mad/},{name:true, borough:true, 'address.coord':true, cuisine:true, _id:false})
```
### 33. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
solution:
```php
db.restaurants.find({'grades.score':{$lt:5}})
```
### 34. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and are located in the borough of Manhattan.
solution:
```php
db.restaurants.find({'grades.score':{$lt:5}, borough:'Manhattan' })
```
### 35. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and are located in the borough of Manhattan or Brooklyn.
solution:
```php
db.restaurants.find({'grades.score':{$lt:5}, borough:{$in:['Manhattan', 'Brooklyn']}})

```
### 36. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
solution:
```php
db.restaurants.find({'grades.score':{$lt:5}, borough:{$in:['Manhattan', 'Brooklyn']}, cuisine:{$ne:'American '} })

```
### 37. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
solution:
```php
db.restaurants.find({'grades.score':{$lt:5}, borough:{$in:['Manhattan', 'Brooklyn']}, cuisine:{$nin:['American ', 'Chinese']}})

```
### 38. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
solution:
```php
db.restaurants.find({$and:[{'grades.score':2}, {'grades.score':6}]})

```
### 39. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
solution:
```php
db.restaurants.find({$and:[{'grades.score':2}, {'grades.score':6}, {borough:'Manhattan'}]})

```
### 40. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
solution:
```php
db.restaurants.find({$and:[{'grades.score':2}, {'grades.score':6}, {borough:{$in:['Manhattan', 'Brooklyn']}}]})
```
### 41. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
solution:
```php

```
### 42. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
solution:
```php

```
### 43. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.
solution:
```php

```
### 44. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan.
solution:
```php

```
### 45. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
solution:
```php

```
### 46. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
solution:
```php

```
### 47. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
solution:
```php

```
### 48. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
solution:
```php

```
### 49. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan.
solution:
```php

```
### 50. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan or Brooklyn.
solution:
```php

```
### 51. Write a MongoDB query to find the average score for each restaurant.
solution:
```php

```
### 52. Write a MongoDB query to find the highest score for each restaurant.
solution:
```php

```
### 53. Write a MongoDB query to find the lowest score for each restaurant.
solution:
```php

```
### 54. Write a MongoDB query to find the count of restaurants in each borough.
solution:
```php

```
### 55. Write a MongoDB query to find the count of restaurants for each cuisine.
solution:
```php

```
### 56. Write a MongoDB query to find the count of restaurants for each cuisine and borough.
solution:
```php

```
### 57. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine.
solution:
```php

```
### 58. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each borough.
solution:
```php

```
### 59. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine and borough.
solution:
```php

```
### 60. Write a MongoDB query to find the number of restaurants that have been graded in each month of the year.
solution:
```php

```
### 61. Write a MongoDB query to find the average score for each cuisine.
solution:
```php

```
### 62. Write a MongoDB query to find the highest score for each cuisine.
solution:
```php

```
### 63. Write a MongoDB query to find the lowest score for each cuisine.
solution:
```php

```
### 64. Write a MongoDB query to find the average score for each borough.
solution:
```php

```
### 65. Write a MongoDB query to find the highest score for each borough.
solution:
```php

```
### 66. Write a MongoDB query to find the lowest score for each borough.
solution:
```php

```
### 67. Write a MongoDB query to find the name and address of the restaurants that received a grade of 'A' on a specific date.
solution:
```php

```
### 68. Write a MongoDB query to find the name and address of the restaurants that received a grade of 'B' or 'C' on a specific date.
solution:
```php

```
### 69. Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and one 'B' grade.
solution:
```php

```
### 70. Write a MongoDB query to find the name and address of the restaurants that have at least one 'A' grade and no 'B' grades.
solution:
```php

```
### 71. Write a MongoDB query to find the name, address, and grades of the restaurants that have at least one 'A' grade and no 'C' grades.
solution:
```php

```
### 72. Write a MongoDB query to find the name, address, and grades of the restaurants that have at least one 'A' grade, no 'B' grades, and no 'C' grades.
solution:
```php

```
### 73. Write a MongoDB query to find the name and address of the restaurants that have the word 'coffee' in their name.
solution:
```php

```
### 74. Write a MongoDB query to find the name and address of the restaurants that have a zipcode that starts with '10'.
solution:
```php

```
### 75. Write a MongoDB query to find the name and address of the restaurants that have a cuisine that starts with the letter 'B'.
solution:
```php

```
### 76. Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that ends with the letter 'y'.
solution:
```php

```
### 77. Write a MongoDB query to find the name, address, and cuisine of the restaurants that have a cuisine that contains the word 'Pizza'.
solution:
```php

```
### 78. Write a MongoDB query to find the restaurants that achieved the highest average score.
solution:
```php

```
### 79. Write a MongoDB query to find all the restaurants with the highest number of "A" grades.
solution:
```php

```
### 80. Write a MongoDB query to find the cuisine type that is most likely to receive a "C" grade.
solution:
```php

```
### 81. Write a MongoDB query to find the restaurant that has the highest average score for the cuisine "Turkish".
solution:
```php

```
### 82. Write a MongoDB query to find the restaurants that achieved the highest total score.
solution:
```php

```
### 83. Write a MongoDB query to find all the Chinese restaurants in Brooklyn.
solution:
```php

```
### 84. Write a MongoDB query to find the restaurant with the most recent grade date.
solution:
```php

```
### 85. Write a MongoDB query to find the top 5 restaurants with the highest average score for each cuisine type, along with their average scores.
solution:
```php

```
### 86. Write a MongoDB query to find the top 5 restaurants in each borough with the highest number of "A" grades.
solution:
```php

```
### 87. Write a MongoDB query to find the borough with the highest number of restaurants that have a grade of "A" and a score greater than or equal to 90.
solution:
```php

```



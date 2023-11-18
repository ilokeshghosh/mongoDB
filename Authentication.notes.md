# Authentication and Authorization in mongoDB
- enable authentication in mongoDB involves making configuration changes

### switch to admin database to create user
```php
use admin
```
### Create user
```php
 db.createUser({user:'adminUser', pwd:'password', roles:['userAdminAnyDatabase', 'dbAdminAnyDatabase']})
```
### Create User and give role to different database
```php
db.createUser({
    user:'ram',
    pwd:'ram',
    roles:[
        {role:'read', db:'college'},
        {role:'readWrite', db:'school'}
    ]
})
```
### User Authentication
```php
db.auth('adminUser', 'password')
```
### Get user Details
```php
 db.getUsers()
```

### Logout
```php
db.logout()
```

#### built in roles : https://www.mongodb.com/docs/manual/reference/built-in-roles/

### Drop User
```php
//1st we need to login as admin
db.dropUser('userName')
```

### Authentication outside mongoSh
```php
mongo --authenticationDatabase admin -u admin -p admin
```
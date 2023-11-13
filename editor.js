//create collection with with validation
db.createCollection('nonfiction', {
    validator: {
        $jsonSchema: {
            required: ['name', 'price'],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'must be a string and required'
                },
                price: {
                    bsonType: 'number',
                    description: 'must be a number and required'
                }
            }
        }
    },
    validationAction: 'error'
})

//to paste in shell
db.createCollection('nonfiction', { validator: { $jsonSchema: { required: ['name', 'price'], properties: { name: { bsonType: 'string', description: 'must be a string and required' }, price: { bsonType: 'number', description: 'must be a number and required' } } } }, validationAction: 'error' })


// modify a collection validation
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


// to paste in shell
db.runCommand({ collMod: 'nonfiction', validator: { $jsonSchema: { required: ['name', 'price', 'authors'], properties: { name: { bsonType: 'string', description: 'must be a string and required' }, price: { bsonType: 'number', description: 'must be a number and required' }, authors: { bsonType: 'array', description: "must be a array types", items: { bsonType: ['object'], required: ['name', 'email'], properties: { name: { bsonType: 'string', description: 'author name must be in string' }, email: { bsonType: 'string', description: 'author email must be in string' } } } } } } }, validationAction: 'error' })

[
    {
        name: '',
        Hobbies: ['', ''],
        identity: { hasPanCard: false, hasAdhaarCard: true },
        bio: '',
        experience: [
            { company: '', duration: 0 },
            { company: '', duration: 0 }

        ],
        age: 0
    }
]


[
    {
        name: 'Ram',
        Hobbies: ['walk', 'cricket'],
        identity: { hasPanCard: true, hasAdhaarCard: true },
        bio: 'i am student',
        experience: [
            { company: 'TCS', duration: 0.5 },
            { company: 'Meta', duration: 2 }

        ],
        age: 25
    },
   {
        name: 'Lara',
        Hobbies: ['chess', 'cricket'],
        identity: { hasPanCard: false, hasAdhaarCard: true },
        bio: 'i am coder',
        experience: [
            { company: 'GS', duration: 2 },
            { company: 'Wipro', duration: 1.2 },
			{ company: 'TCS', duration: 1 }
        ],
        age: 28
    },
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
]


//using filter operator
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
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

const mongoose = require("mongoose")

// the difference types of properties used in the schema are type, unique, required and some more commonly used properties are default, enum, min, max, match, trim, lowercase, uppercase, index, sparse, select, validate and some more. The type property is used to define the data type of the field. The unique property is used to ensure that the value of the field is unique across all documents in the collection. The required property is used to ensure that the field is not empty when creating a new document. The default property is used to set a default value for the field if no value is provided. The enum property is used to define a set of allowed values for the field. The min and max properties are used to define the minimum and maximum values for the field.
// in unique we see [] first attribute is boolean and second attribute is error message which will be shown if unique constraint is violated. 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [ true, "username already taken" ],
        required: true,
    },

    email: {
        type: String,
        unique: [ true, "Account already exists with this email address" ],
        required: true,
    },

    password: {
        type: String,
        required: true
    }
}) // this whole block of code is used to define a schema for the user model using the mongoose library. A schema is a blueprint for the structure of a document in a MongoDB collection. In this case, we are defining a schema for the "users" collection with three fields: username, email, and password. Each field has its own data type and validation rules. The username and email fields are set to be unique, meaning that no two documents in the collection can have the same value for these fields. The required property is set to true for all three fields, meaning that they must be provided when creating a new user document.
// new is used to create a new instance of the mongoose.Schema class, which is then used to create a new model for the "users" collection in the database. The model is created using the mongoose.model() method, which takes two arguments: the name of the collection and the schema to use for that collection. In this case, we are creating a model called "users" using the userSchema defined above.

const userModel = mongoose.model("users", userSchema) // model is used to create a model for the "users" collection in the database using the userSchema defined above. The first argument is the name of the collection and the second argument is the schema to use for that collection. The model is then stored in a variable called userModel, which can be used to interact with the "users" collection in the database.

module.exports = userModel
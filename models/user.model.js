const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameValidator = [
    function(val){
        return (val.length > 0 && val.toLocaleLowerCase() != 'none')
    },

    // Custom error text
    'Please provide a valid name'
];

const userSchema = new  Schema({
    name: {
        type: String,
        required: true,
        validate: nameValidator
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});


// Export model...
module.exports = mongoose.model('User', userSchema)
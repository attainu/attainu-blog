const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true
    }
});



// Export model...
module.exports = mongoose.model('Post', postSchema);
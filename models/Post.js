const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sum: {
        type: String,
        required: true
    },
    filename: {
        type: 'string'
    }

});
module.exports = mongoose.model('Post', postSchema);
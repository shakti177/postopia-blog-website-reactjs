const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: 
        String,
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post' 
        }]
});

module.exports = mongoose.model('User', userSchema);
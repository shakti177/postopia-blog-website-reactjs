const mongoose = require('mongoose');

const mongooseURI = process.env.MONGODB_URI;

mongoose.connect(mongooseURI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

module.exports = mongoose.connection;
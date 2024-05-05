
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error: ', err));


const userSchema = new mongoose.Schema({
username: { type: String, required: true },
parent_id: { type: String }});

const User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);
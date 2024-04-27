
const mongoose = require('mongoose');


const mongoURI = 'mongodb://localhost:27017/mydatabase';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error: ', err));


const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    parent_id: { type: String} 
});


const User = mongoose.model('User', userSchema);


const newUser = new User({
    id: '3',
    username: 'tarek',
    parent_id: '1' 
});


newUser.save()
    .then(() => console.log('User created successfully'))
    .catch(err => console.log('Error creating user: ', err));


User.find()
    .then(users => console.log('Users: ', users))
    .catch(err => console.log('Error retrieving users: ', err));
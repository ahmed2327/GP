const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mydatabase';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error: ', err));

const locationSchema = new mongoose.Schema({
    location: { type: String, required: true },
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
    region: { type: String }
});

const Location = mongoose.model('Location', locationSchema);

Location.find()
    .then(locations => console.log('Locations: ', locations))
    .catch(err => console.log('Error retrieving locations: ', err));



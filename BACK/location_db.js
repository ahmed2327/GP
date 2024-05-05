const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mydatabase';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error: ', err));

const locationSchema = new mongoose.Schema({
    location: { type: String, required: true },
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
    region: { type: String },
    child_id: { type: Number }
},{timestamps: true});

const Location = mongoose.model('Location', locationSchema);

const newLocation = new Location({
    location: "cairo",
    long: 0323,
    lat: 5445,
    region: "egy",
    child_id: 1
});

async function saveLocation(newLocation) {

    console.log(newLocation);
    const dataToInsert = [
        { location: newLocation.location, long: newLocation.long, lat: newLocation.lat, region: newLocation.region, child_id: newLocation.child_id }
    ];
    // Insert data into the database
    Location.insertMany(dataToInsert)
        .then(() => console.log('Data inserted successfully'))
        .catch(err => console.log('Error inserting data: ', err));
}
module.exports = mongoose.model('Location', locationSchema);
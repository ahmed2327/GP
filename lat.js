const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongoURI = 'mongodb://localhost:27017/mydatabase';


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error: ', err));

//will add child id
//get the last location or last known locations
const locationSchema = new mongoose.Schema({
    location: { type: String, required: true },
    long: { type: Number, required: true },
    lat: { type: Number, required: true },
    region: { type: String }
});


const Location = mongoose.model('Location', locationSchema);
const express=require("express")


const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.post('/GetLocation', async (req, res) => {
    console.log(req)
    const { location, long, lat } = req.body;
    try {
        const newData = new Location({
            location,
            long,
            lat
            });

    
        await newData.save();

        res.status(201).send('Weather data saved successfully');
    } catch (error) {
        console.error('Error saving weather data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
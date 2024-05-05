const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const location = require('./location_db');
const cors = require('cors');
const user = require('./database'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// POST route
app.post('/save-location', async (req, res) => {
    try {
        const newData = req.body; 
        const result = await location.create(newData);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//LASTTTT 4 LOCATIONS 
app.get('/history', async (req, res) => {
  try {
  const { fieldName, value} = req.query;
  const id = parseFloat(value);
    const results = await location.aggregate([
        { $match: { [fieldName]: id } }, 
        { $sort: { createdAt: -1 } },
        { $limit: 4 } 
      ]); 
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//LASTTTT LOCATION
app.get('/last-location', async (req, res) => {
    try {
        const { fieldName, value} = req.query; 
      const id = parseFloat(value);
      const results = await location.aggregate([
        { $match: { [fieldName]: id } }, 
        { $sort: { createdAt: -1 } }, 
        { $limit: 1 } 
      ]); 
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//NEW USER DATABASE
  app.post('/new-user', async (req, res) => {
    try {
      const userData = req.body;
      const newUser = new user(userData);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//PARENT'S CHILDS BY ID
  app.get('/users/:parent_id', async (req, res) => {
    try {
      const { parent_id } = req.params;
      const users = await user.find({ parent_id });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

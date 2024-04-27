
const Location = require('./location_db');

async function getdata(lat,long){
    const promise=await fetch(
        `http://api.weatherapi.com/v1/current.json?key=69bf49cc160f4162851172639241003&q=${lat},${long}&aqi=yes`

    );
    return await promise.json();
}

async function gotlocation(position){
const result=await getdata(
    position.coords.latitude,
    position.coords.longitude
    );

console.log(result);

// const dataToInsert = [
//     { location: result., long: -74.0059728, lat: 40.712776, region: 'New York' },
    
// ];

// // Insert data into the database
// Location.insertMany(dataToInsert)
//     .then(() => console.log('Data inserted successfully'))
//     .catch(err => console.log('Error inserting data: ', err));

} 

function failedtoget(){
    console.log("there was some issues");
}

// button.addEventListener("click",async()=>{
navigator.geolocation.getCurrentPosition(gotlocation,failedtoget)
// });

// Example data to insert








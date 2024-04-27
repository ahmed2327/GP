const button = document.getElementById("get-location-button");


async function getdata(lat, long) {
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=69bf49cc160f4162851172639241003&q=${lat},${long}&aqi=yes`

    );
    return await promise.json();
}

async function gotlocation(position) {
    const result = await getdata(
        position.coords.latitude,
        position.coords.longitude
    );
    console.log("start");
    console.log(result.location.lat);
    const response = await fetch('http://localhost:3000/GetLocation', {
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location: result.location.name,
            long: result.location.lon,
            lat: result.location.lat,
            region:result.location.reg
            
        })
    });

    if (response.ok) {
        console.log('Weather data saved successfully');
    } else {
        console.error('Failed to save weather data');
    }

}

function failedtoget() {
    console.log("there was some issues");
}

button.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(gotlocation, failedtoget)
});







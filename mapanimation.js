mapboxgl.accessToken = 'pk.eyJ1IjoiamliaW52YmlqdSIsImEiOiJjbDFteGc2MXowNWtkM2xxb2Vzbmc2aXAzIn0.3fqHEp0BRw8Wu4q_IK8IIw';


// This is the map instance
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.057083,42.361145],
    zoom: 14,
  });
  let markers = [];
async function run(){
    markerRemover();
    const locations = await getBusLocations();
	console.log(locations);
    displayBusses(locations.data);
	setTimeout(run, 15000);
}

async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles';
    const response = await fetch(url);
    const data    = await response.json();
    return data
} 

function displayBusses(markerMaker){
    console.log(markerMaker)
    markerMaker.forEach(sum=>{
        markers.push(new mapboxgl.Marker().setLngLat([sum.attributes.longitude, sum.attributes.latitude]).addTo(map))
    })
}

const markerRemover = () => {
    markers.forEach(marker=>{
        marker.remove()
    })
    markers = []
}

run()
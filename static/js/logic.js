// Define url
// M2.5+ earthquakes, last 30 days

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

// Creating the map object

let myMap = L.map("map", 
{
    center: [10, -10],
    zoom: 3
});
  
  // Addi the tile layer
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

function getColor(depth) 
{
    if (depth >= 90) return "red";
    else if (depth >= 70 && depth < 90) return "orangered";
    else if (depth >= 50 && depth < 70) return "orange";
    else if (depth >= 30 &&  depth < 50) return "yellow";
    else if (depth >= 10 && depth < 30) return "greenyellow"
    else if (depth > 0) return "lawngreen";
    else return "black";
    console.log(depth);
}


  // Retreive GeoJSON data

  d3.json(url).then(function(data) 
  {
        let lat = null
        let lon = null 
        let magnitude = null
        let depth = null
        let location = null
    
        for (i=0; i< data["features"].length; i++) 
            {
            lat = data["features"][i]["geometry"]["coordinates"][1]
            lon = data["features"][i]["geometry"]["coordinates"][0]
            depth = data["features"][i]["geometry"]["coordinates"][2]

            magnitude = data["features"][i]["properties"]["mag"]
            location = data["features"][i]["properties"]["place"]

            // color and size of marker

            let color = getColor(depth)
            size = Math.pow(magnitude, 7);

        // Create marker

        L.circle([lat, lon], 
                {
                color : color,
                fillColor: color,
                fillOpacity: 0.5,
                radius: size
            
                }).bindPopup(`<h1> Magnitude: ${magnitude} <h1> <hr> <h3>Location: ${location} <br> Depth: ${depth} km <br> Latitude: ${lat} <br>Longitude: ${lon}`).addTo(myMap)
            }
    })
  
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info legend');
        let depths = [0, 10, 30, 50, 70, 90];
        let labels = ["<10", "10-30", "30-50", "50-70", "70-90"];
    
        // Loop through the depth ranges and colors to create the legend
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
  
    legend.addTo(myMap); 
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


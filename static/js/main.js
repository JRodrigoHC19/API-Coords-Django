import {my_coords} from './almacen/coords.js'

// SE EJECUTA CUANDO EL MAPA ES CARGADO COMPLETAMENTE
document.addEventListener('DOMContentLoaded', () => {
    // C R E A C I O N   D E   M A P A
    let map = createMap([-16.40407753, -71.526992], 10);                    // ( [coords] , zoom )
    let marker = null;


    let index = 0                    // Índice para obtener las coordenadas
    const coordenadas = []           // Almacena las coordenad   as obtenidas
    function obtenerCoordenadas() {
            fetch(`http://localhost:8000/coords/`)
                .then(response => response.json())
                .then(data => {
                    // Almacena las coordenadas obtenidas
                    coordenadas.push(data[index]);
                    marker = L.marker([coordenadas[index].latitude, coordenadas[index].longitude], {icon: my_icon}).addTo(map);
                    index++; // Incrementa el índice para el siguiente conjunto de coordenadas
                    if (index >= coordenadas.length) {index = 0; }
                })
                .catch(error => {
                    console.error('Error al obtener coordenadas:', error);
                });

                // map.removeLayer(marker);
    }   
    setInterval(obtenerCoordenadas, 3000);
    

    // C R E A C I O N   D E   L I N E A
    const polyline = L.polyline( my_coords ).addTo(map)

    // C R E A C I O N   D E   P O L I G O N O
    const polygon = L.polygon( coords_polygon ).addTo(map)

    // C R E A C I O N   D E   M A R C A D O R
    const marcador = L.marker([-16.43713039, -71.5178472], {icon: my_icon}).addTo(map)

    // C R E A C I O N   D E   P O P P U S
    const popup = L.popup().setLatLng([-16.40713039, -71.5278472]).setContent("Hola, soy un poppup!").openOn(map)
});


// document.addEventListener('DOMContentLoaded', () => {
//     let map = createMap([-16.40407753, -71.526992], 16);
//     // let coordenadas = JSON.parse(document.getElementById('coordenadas-json').textContent);
//     // let markerFeatureGroup = L.featureGroup().addTo(map);

//     let marker = null;
//     // let polyline = null;
//     // let currentIndex = 0;

//     function updateMarkerAndPolyline() {
//         // Clear the existing marker and polyline
//         // if (marker) {
//         //     map.removeLayer(marker);
//         // }
//         // if (polyline) {
//         //     map.removeLayer(polyline);
//         // }

//         // Get the current coordinates
//         // const currentCoord = coordenadas[currentIndex];

//         var myIcon = L.icon({
//             iconUrl: 'https://icons.veryicon.com/png/o/business/classic-icon/bus-20.png',
//             iconSize: [35, 37],
//             iconAnchor: [30, 5],
//         });

//         // Add a new marker at the current position
//         marker = L.marker([-16.42848, -71.52661],{icon: myIcon}).addTo(map);

//         // Create a new list of coordinates for the polyline from the beginning to the current position
//         // const polylineCoords = coordenadas.slice(0, currentIndex + 1).map(coord => [coord.latitude, coord.longitude]);

//         // Add a new polyline with the current coordinates
//         // polyline = L.polyline(polylineCoords, { color: "#ff7800" }).addTo(map);

//         // Increment the index for the next update
//         // currentIndex = (currentIndex + 1) % coordenadas.length;
//     }
    
//     function obtenerYMostrarCoordenadas() {
//         let index = 0; // Índice para obtener las coordenadas
//         const coordenadas = []; // Almacena las coordenadas obtenidas

//         function obtenerCoordenadas() {
//             fetch(`http://localhost:8000/coordenadas/`)
//                 .then(response => response.json())
//                 .then(data => {
//                     // Almacena las coordenadas obtenidas
//                     coordenadas.push(data[index]);
//                     marker = L.marker([coordenadas[index].latitude, coordenadas[index].longitude]).addTo(map);
//                     setTimeout(() => {
                        
//                     }, 400);
                    
//                     index++; // Incrementa el índice para el siguiente conjunto de coordenadas
//                     if (index >= coordenadas.length) {index = 0; }
//                 })
//                 .catch(error => {
//                     console.error('Error al obtener coordenadas:', error);
//                 });

//                 map.removeLayer(marker);
//         }

//     // Llamar a obtenerCoordenadas cada 2 segundos
//     setInterval(obtenerCoordenadas, 100);
// }

//     obtenerYMostrarCoordenadas();
//     // Update the marker and polyline every second
//     // setInterval(updateMarkerAndPolyline, 1000);
//     // updateMarkerAndPolyline();

// });

function createMap(center, zoom) {
    let map = L.map('map', { zoomControl:true, animate:true }).setView(center, zoom)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>" }).addTo(map)
    return map
}

// COORDENADAS DEL POLIGONO
const coords_polygon = [
    [-16.40713039, -71.5278472], 
    [-16.60470123, -71.5278015], 
    [-16.42781067, -71.7202170], 
    [-16.17019104, -71.3195846]
]

// ICONO DEL MARCADOR
const my_icon = L.icon({
    iconUrl: 'https://icons.veryicon.com/png/o/business/classic-icon/bus-20.png',
    iconSize: [30, 30],
})

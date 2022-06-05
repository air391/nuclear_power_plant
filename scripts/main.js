// initial
var center = [39.850721, 116.452829]
var mymap = L.map('mapid').setView(center, 6);
var map = "gaode";
if (map === "gaode") {
    L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",{
                    attribution: '&copy; 高德地图',
                    subdomains: "1234"
                }).addTo(mymap);
}
else if (map === "mapbox") {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
}

//获取数据，并添加标识
$.getJSON("lib/data/data.json", function(data) {
    data.forEach(element => {
        var name = element.name;
        var pos = element.position;
        if ("coordinate" in element) {
            var coordinate = element.coordinate;
            L.marker(coordinate).addTo(mymap).bindPopup(name);
        }
    });
});

// L.circle([39.850721, 116.452829], 50000, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5
// }).addTo(mymap).bindPopup("I am a circle.");

// L.polygon([
//     [120.95928,30.43579],
//     [39.774769, 94.739453],
//     [27.44979, 105.197046]
// ]).addTo(mymap).bindPopup("I am a polygon.");


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
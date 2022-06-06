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
$.getJSON("lib/data/data4.json", function(data) {
    data.forEach(element => {
        var name = element.name;
        var pos = element.position;
        if ("coordinate" in element) {
            var coordinate = element.coordinate;
            var show_html = element.show_html;
            L.marker(coordinate).addTo(mymap).bindPopup(show_html, {max_Width:"auto"});
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
    var t = [
"<div>",
"<h3>秦山核电站:已投入运营</h3>",
"2022年1-3月运行情况：",
"<table>",
"    <tr>",
"        <td>项目</td>",
"        <td>核电厂</td>",
"        <td>机组</td>",
"        <td>装机容量（MWe）</td>",
"        <td>发电量（亿千瓦时）</td>",
"        <td>上网电量（亿千瓦时）</td>",
"        <td>核电设备\n利用小时数</td>",
"        <td>机组能力因子（%）</td>",
"    </tr>",
"    <tr>",
"        <td>秦山核电站</td>",
"        <td>秦山核电厂</td>",
"        <td>1号机组</td>",
"        <td>12</td>",
"        <td>23</td>",
"        <td>34</td>",
"        <td>45</td>",
"        <td>56</td>",
"    </tr>",
"    <tr>",
"        <td>秦山核电站</td>",
"        <td>秦山第二核电厂</td>",
"        <td>1号机组</td>",
"        <td>12</td>",
"        <td>23</td>",
"        <td>34</td>",
"        <td>45</td>",
"        <td>56</td>",
"    </tr>",
"    <tr>",
"        <td>秦山核电站</td>",
"        <td>秦山第二核电厂</td>",
"        <td>2号机组</td>",
"        <td>12</td>",
"        <td>23</td>",
"        <td>34</td>",
"        <td>45</td>",
"        <td>56</td>",
"    </tr>",
"</table>",
"<div><div style=\"float: left;\"><a href=\"http://www.china-nea.cn/site/content/40689.html\">了解更多</a></div><div style=\"text-align: right;\">数据来源：<a href=\"http://www.china-nea.cn/site/content/40689.html\">中国核能行业协会</a></div></div>",
"</div>",
    ]
    t = t.join("");
    popup
        .setLatLng(e.latlng)
        .setContent("you click on " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
let div = document.getElementsByClassName("do")[0],
    inp = document.getElementsByClassName("inp")[0],
    btn = document.getElementsByClassName("btn")[0],
    map = "",
    osm = "",
    gs = "",
    w = "",
    bl = "",
    ol = "",
    lat = 0,
    lon = 0;

map = L.map("map").setView([0, 0], 3);
L.Control.geocoder().addTo(map);
gs = L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
    subdomains: ["mt0", "mt1", "mt2", "mt3"]
}).addTo(map);
w = L.tileLayer.wms("https://ows.mundialis.de/services/service?", {
    layers: "TOPO-OSM-WMS"
}).addTo(map);
osm = L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

bl = {
    "Google Satellite": gs,
    "Mundialis": w,
    "Open Street Map": osm
};

L.control.scale().addTo(map);
L.control.layers(bl).addTo(map);

function searchIp() {
    axios.get("https://ipinfo.io/" + inp.value)
        .then(function(da0) {
            [lat, lon] = da0.data.loc.split(",");
            map.setView([lat, lon], 6);
            L.marker([lat, lon]).addTo(map).bindPopup(`IP: ${da0.data.ip}<br />Latitude: ${lat}<br />Longitude: ${lon}<br />Organization: ${da0.data.org}<br />Region: ${da0.data.region}<br />Timezone: ${da0.data.timezone}`).openPopup();

            map.on("click", function(e) {
                L.popup()
                    .setLatLng(e.latlng)
                    .setContent(e.latlng.toString())
                    .openOn(map);
            });

            console.log(da0);
        })
        .catch(function(e) {
            console.error(e);
        });
}

btn.addEventListener("click", function(e) {
    e.preventDefault();
    searchIp();
});

inp.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchIp();
    }
});


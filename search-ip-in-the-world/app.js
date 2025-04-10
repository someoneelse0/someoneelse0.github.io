let i = document.getElementsByTagName("input")[0];
let p = document.getElementsByTagName("p");
let btn = document.getElementsByTagName("button")[0];
let d = document.getElementById("map");
let a = "";
let aa = [];
let la = 0;
let ln = 0;

function f() {
    axios.get("https://ipinfo.io/" + i.value)
        .then(function(res0) {
            p[0].innerHTML = "Data:";
            p[1].innerHTML = "IP: " + res0.data.ip + "<br />Hostname: " + res0.data.hostname + "<br />City: " + res0.data.city + "<br />Region: " + res0.data.region + "<br />Country: " + res0.data.country + "<br />Location: " + res0.data.loc + "<br />Organization: " + res0.data.org + "<br />Postal: " + res0.data.postal + "<br />Timezone: " + res0.data.timezone + "<br />";
            aa = res0.data.loc.split(",");
            la = aa[0];
            ln = aa[1];

            function fm() {
                var m = {
                    center: new google.maps.LatLng(la, ln),
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                };
                var mp = new google.maps.Map(d, m);
                var mrkr = new google.maps.Marker({
                    position: new google.maps.LatLng(la, ln),
                });
                mrkr.setMap(mp);
                var iw = new google.maps.InfoWindow({
                    content: "IP: " + res0.data.ip + "<br />CITY: " + res0.data.city + "<br />REGION: " + res0.data.region + "<br />COUNTRY: " + res0.data.country + "<br />ORGANIZATION: " + res0.data.org + "<br />TIMEZONE: " + res0.data.timezone,
                });
                google.maps.event.addListener(mrkr, "click", function() {
                    iw.open(mp, mrkr);
                });
            }
            
            fm();

        })
        .catch(function(error) {
            console.log(error);
            p[0].innerHTML = error;
        })
}

btn.addEventListener("click", function(event) {
    event.preventDefault();
    f();
}, false);

i.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        f();
    }
});

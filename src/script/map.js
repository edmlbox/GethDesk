//Send Ip to server and get data back with geoJSON
const getGeoData = function(arrayIp) {
  let bson1 = [];
  arrayIp.forEach((element, index, arr) => {
    bson1.push({ query: element });
  });

  let req = new XMLHttpRequest();
  req.open("POST", "http://ip-api.com/batch");
  req.send(JSON.stringify(bson1));
  req.onload = () => {
    let responseFromIpIp = JSON.parse(req.responseText);

    console.log("mapAPI", responseFromIpIp);GetMap();
    /* mapLibReadyHandler(responseFromIpIp);*/handleLongLat(responseFromIpIp);
  };
};

// This function run when receives data with node list from Ajax
function getIp(result) {
  let arrayIp = [];
  for (let index = 0; index < result.length; index++) {
    let before = result[index].network.remoteAddress;

    var s = before;
    var n = s.indexOf(":");
    s = s.substring(0, n != -1 ? n : s.length);
    arrayIp.push(s);
  }

  getGeoData(arrayIp);
}

var map;
function GetMap() {
  map = new Microsoft.Maps.Map(document.getElementById("myMap"), {
    credentials:
      "AktWnPLnLOVzsFWrXp4Li69oUJtBAeynTPsHcUaHPw2RQ0qnHCfKfTRDLdZYRTLQ",
    center: new Microsoft.Maps.Location(51.50632, -0.12714),
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    zoom: 3
  });
}



function handleLongLat(responseFromIpIp){
  window.mapData = [];

  for (let i = 0; i < responseFromIpIp.length; i++) {
    window.mapData.push({
      lat: responseFromIpIp[i].lat,
      lng: responseFromIpIp[i].lon,
      city: responseFromIpIp[i].city,
      query: responseFromIpIp[i].query,
      regionName: responseFromIpIp[i].regionName,
      zip: responseFromIpIp[i].zip,
      org: responseFromIpIp[i].org,
      country: responseFromIpIp[i].country
    });
  }


  console.log('window.mapData',window.mapData)
console.log(Math.random())
  window.mapData.forEach((element, number, array)=>{
  
    let center = { latitude: element.lat+Math.floor(Math.random() * 10) + 1, longitude:  element.lng+Math.floor(Math.random() * 10) + 1 };
    var pin = new Microsoft.Maps.Pushpin(center, {
      title: element.query,
      subTitle: '',
      text: number.toString()
    });
    map.entities.push(pin);
  })
  

  

}









/*
let map;
let oms;
function readyMapLink() {
  var mapElement = document.getElementById("map_element");
   map = new google.maps.Map(mapElement, {
    center: { lat: 52, lng: -1 },
    zoom: 2
  });
  oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true, // we promise not to move any markers, allowing optimizations
    markersWontHide: true, // we promise not to change visibility of any markers, allowing optimizations
    basicFormatEvents: true // allow the library to skip calculating advanced formatting information
  });

}
var mapLibsReady = 0;

function mapLibReadyHandler(responseFromIpIp) {


  window.mapData = [];


  var iw = new google.maps.InfoWindow();
  for (let i = 0; i < responseFromIpIp.length; i++) {
    window.mapData.push({
      lat: responseFromIpIp[i].lat,
      lng: responseFromIpIp[i].lon,
      city: responseFromIpIp[i].city,
      query: responseFromIpIp[i].query,
      regionName: responseFromIpIp[i].regionName,
      zip: responseFromIpIp[i].zip,
      org: responseFromIpIp[i].org,
      country: responseFromIpIp[i].country
    });
  }

  /*if (++mapLibsReady < 2) return;*/

/*

  oms.removeAllMarkers()

  for (var i = 0, len = window.mapData.length; i < len; i++) {
    (function() {
      // make a closure over the marker and marker data
      var markerData = window.mapData[i]; // e.g. { lat: 50.123, lng: 0.123, text: 'XYZ' }
      var marker = new google.maps.Marker({ position: markerData }); // markerData works here as a LatLngLiteral
      google.maps.event.addListener(marker, "spider_click", function(e) {
        // 'spider_click', not plain 'click'
        iw.setContent(
          "<h4>" +
            markerData.country +
            "</h4><p>" +
            markerData.regionName +
            "</p><p>" +
            markerData.city +
            "</p><p>" +
            markerData.org +
            "</p></p><p>" +
            markerData.zip +
            "</p></p><p>" +
            markerData.query +
            "</p>"
        );
        iw.open(map, marker);
      });
    
      

      oms.addMarker(marker); // adds the marker to the spiderfier _and_ the map
    })();
  }
  window.map = map; // for debugging/exploratory use in console
  window.oms = oms; // ditto
}
*/

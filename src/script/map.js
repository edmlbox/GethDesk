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

    console.log("mapAPI", responseFromIpIp);
    GetMap();
    /* mapLibReadyHandler(responseFromIpIp);*/ handleLongLat(responseFromIpIp);
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

function handleLongLat(responseFromIpIp) {
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

  console.log("window.mapData", window.mapData);
  console.log(Math.random());
  window.mapData.forEach((element, number, array) => {
    let center = {
      latitude: element.lat + Math.floor(Math.random() * 10) + 1,
      longitude: element.lng + Math.floor(Math.random() * 10) + 1
    };
    var pin = new Microsoft.Maps.Pushpin(center, {
      title: element.query,
      subTitle: "",
      text: number.toString()
    });
    map.entities.push(pin);
  });
}

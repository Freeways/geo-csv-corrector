var map;
//http://a.tile.openstreetmap.org/23/4432298/3269305.png
function initmap(lat, lng, zoom) {
  // set up the map
  map = new L.Map('map');

  // create the tile layer with correct attribution
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 20, attribution: osmAttrib});

  // start the map in South-East England
  map.setView(new L.LatLng(lat, lng), zoom);
  map.addLayer(osm);
}

function processCSV(data) {
  data.forEach(function (d) {
    var marker = L.marker([d.lat, d.lon], {title: d.name, draggable: true}).addTo(map);
    marker.on('dragend', function () {
      var link = document.querySelector('#to-csv');
      link.style.display = 'block';
    });
    d.marker = marker;
  });
  return data;
}
function export2CSV() {
  var csv = "name,lat,lon\n"
  markers.forEach(function (d) {
    csv += d.name + "," + d.marker.getLatLng().lat + "," + d.marker.getLatLng().lng + "\n";
  });
  var a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(new Blob([csv], {type: 'text/csv'}));
  a.download = 'test.csv';
  document.body.appendChild(a)
  a.click();
  document.body.removeChild(a)
  var link = document.querySelector('#to-csv');
  link.style.display = 'none';
}
initmap(36.826248, 10.174414, 14);
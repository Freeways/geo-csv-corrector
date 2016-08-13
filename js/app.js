var map;
var link = document.querySelector('#to-csv');
//http://a.tile.openstreetmap.org/23/4432298/3269305.png
function initmap(lat, lng, zoom) {
  // set up the map
  map = new L.Map('map');

  // create the tile layer with correct attribution
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 20, attribution: osmAttrib});

  // start the map
  map.setView(new L.LatLng(lat, lng), zoom);
  map.addLayer(osm);
}
stripTags = function(html){
  return html.replace(/(<([^>]+)>)/ig,"");
};
function processCSV(data) {
  data.forEach(function (d) {
    var marker = L.marker([d.lat, d.lon], {title: d.name, draggable: true}).addTo(map);
    marker.bindPopup('<p contenteditable="true">' + d.content + '</p>');
    marker.on('dragend', function () {
      link.style.display = 'block';
    });
    marker.state = 1;
    marker.on('click', function(){
      if(this.state){
        this.closePopup();
      }else{
        this.openPopup();
      }
    })
    marker.on('popupopen', function(){
      this.state = 0;
    });
    marker.on('popupclose', function(){
      var popup = this.getPopup();
      oldContent = popup.getContent();
      newContent = '<p contenteditable="true">' + stripTags(popup._wrapper.innerHTML) + '</p>';
      popup.setContent(newContent);
      this.state = 1;
      if(oldContent !== newContent)
        link.style.display = 'block';
    });
    d.marker = marker;
  });
  return data;
}

function export2CSV() {
  var csv = "name,lat,lon,content\n"
  markers.forEach(function (d) {
    var content = stripTags(d.marker.getPopup().getContent());
    csv += d.name + "," + d.marker.getLatLng().lat + "," + d.marker.getLatLng().lng + "," + content + "\n";
  });
  var a = window.document.createElement('a');
  a.href = window.URL.createObjectURL(new Blob([csv], {type: 'text/csv'}));
  a.download = 'test.csv';
  document.body.appendChild(a)
  a.click();
  document.body.removeChild(a)
  link.style.display = 'none';
}
initmap(36.826248, 10.174414, 14);
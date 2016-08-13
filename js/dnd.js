var dropzone = document.querySelector('#map');
var dragzone = document.querySelector('#map');
var filelist;
var markers;

dropzone.addEventListener('drop', function (event) {
  if (event.preventDefault) {
    event.preventDefault();
  }

  var types = event.dataTransfer.types;
  filelist = event.dataTransfer.files;
  var file = event.dataTransfer.files[0];

  if (file.type !== 'text/csv') {
    alert('Uploaded file must be a RFC4180-compliant CSV file');
    return false;
  }

  // Init file reader
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    markers = processCSV(d3.csvParse(fileReader.result));
  };
  fileReader.onerror = function (e) {
    throw 'Error reading CSV file';
  };

  // Start reading file
  fileReader.readAsText(file);

  return false;
}, false);

dragzone.addEventListener('dragstart', function (event) {
  return true;
}, true);

dragzone.addEventListener('dragend', function (event) {
  return true;
}, true);

dropzone.addEventListener('dragenter', function (event) {
  if (event.preventDefault)
    event.preventDefault();
  return false;
}, false);

dropzone.addEventListener('dragover', function (event) {
  if (event.preventDefault)
    event.preventDefault(); // allows us to drop
}, false);

dropzone.addEventListener('dragleave', function (event) {
  if (event.preventDefault)
    event.preventDefault(); // allows us to drop
  return false;
}, false);
var pos;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  var a = position.coords.latitude;
  var b = position.coords.longitude;

  pos = [a, b];

  console.log(pos);
}

getLocation();

export default getLocation;

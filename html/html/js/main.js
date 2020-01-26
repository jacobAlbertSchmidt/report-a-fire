function submitForm(fireLocations) {

  var form = document.getElementsByName('fireLocation')[0]
  form.submit()
  form.reset()
}

var map;

function SetStyleToGoogle(element) {
  element.style.color = 'rgb(25,25,25)';
  element.style.fontFamily = 'Roboto,Arial,sans-serif';
  element.style.fontSize = '16px';
  element.style.lineHeight = '38px';
  element.style.paddingLeft = '5px';
  element.style.paddingRight = '5px';
  element.innerHTML = 'Center Map';
  element.style.backgroundColor = '#fff';
  element.style.border = '2px solid #fff';
  element.style.cursor = 'pointer';
  element.style.marginBottom = '22px';
  element.style.textAlign = 'center';
}

function AddLocation(controlDiv, map, fireLocations) {

  var isVisible = false

  var wrapper = document.createElement('div')
  wrapper.style.visibility = "hidden"
  wrapper.style.padding = "20px"
  wrapper.style.backgroundColor = "white"
  
  wrapper.style.margin = "8px"
  wrapper.style.borderRadius = "20px"
  
  wrapper.style.boxShadow = "1px 1px 1px 1px #ccc"
  var form = document.createElement('form')
  form.reset()
  form.setAttribute("method", "POST")
  form.setAttribute("name", "fireLocation")

  var locationWrapper = document.createElement('div')

  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    position: {lat: -25.363, lng: 131.004} 
  });
  marker.setVisible(false)


  var dropPin = document.createElement('span')
  dropPin.style.color = 'rgb(25,25,25)';
  dropPin.style.fontFamily = 'Roboto,Arial,sans-serif';
  dropPin.style.fontSize = '16px';
  dropPin.style.boxShadow = "1px 1px 1px 1px #ccc"
  dropPin.style.marginRight = '5px';
  dropPin.style.backgroundColor = '#fff';
  dropPin.style.border = '1px solid #666';
  dropPin.style.cursor = 'pointer';
  dropPin.style.textAlign = 'center';
  dropPin.innerText = "Select Location"
  dropPin.style.borderRadius = "2em"
  dropPin.style.lineHeight = "auto"
  dropPin.style.paddingLeft = "1em"
  dropPin.style.paddingRight = "1em"
  dropPin.setAttribute("onmouseover", "this.style.backgroundColor = \"#ddd\"")
  dropPin.setAttribute("onmouseout", "this.style.backgroundColor = \"#fff\"")
  
  var latitude = document.createElement('input')
  latitude.setAttribute("visibility", "none")
  latitude.setAttribute("type", "hidden")
  latitude.setAttribute("name", "latitude")

  var longitude = document.createElement('input')
  longitude.setAttribute("visibility", "none")
  longitude.setAttribute("type", "hidden")
  longitude.setAttribute("name", "longitude")

  form.appendChild(latitude)
  form.appendChild(longitude)
  
  dropPin.addEventListener("click", function() {
    marker.setVisible(true)
  })
  console.log(marker.getPosition())

  form.appendChild(dropPin)
  var severity = document.createElement("span") 
  SetStyleToGoogle(severity)
  severity.innerHTML = "Severity:"
  form.appendChild(severity)

  var severitySlider = document.createElement("input")
  severitySlider.setAttribute("type", "range")
  severitySlider.setAttribute("min", "1")
  severitySlider.setAttribute("max", "100")
  severitySlider.setAttribute("name", "severity")
  severitySlider.setAttribute("class", "slider")
  severitySlider.style.position = "relative"
  severitySlider.style.top = ".21em"
  severitySlider.style.width = "20em"

  form.appendChild(severitySlider)

  var sliderValue = document.createElement("span")
  SetStyleToGoogle(sliderValue)
  sliderValue.innerHTML = severitySlider.value
  severitySlider.oninput = function() {
    sliderValue.innerHTML = this.value
  }

  form.appendChild(sliderValue)

  var submit = document.createElement("span")
  submit.style.color = 'rgb(25,25,25)';
  submit.style.fontFamily = 'Roboto,Arial,sans-serif';
  submit.style.fontSize = '16px';
  submit.style.boxShadow = "1px 1px 1px 1px #ccc"
  submit.style.marginRight = '5px';
  submit.style.backgroundColor = '#fff';
  submit.style.border = '1px solid #666';
  submit.style.cursor = 'pointer';
  submit.style.textAlign = 'center';
  submit.innerText = "Drop Pin"
  submit.style.borderRadius = "2em"
  submit.style.lineHeight = "auto"
  submit.style.paddingLeft = "1em"
  submit.style.paddingRight = "1em"
  submit.setAttribute("onmouseover", "this.style.backgroundColor = \"#ddd\"")
  submit.setAttribute("onmouseout", "this.style.backgroundColor = \"#fff\"")
  submit.innerHTML = "Submit"
  submit.addEventListener("click", function() {
    var lat = marker.getPosition().lat();
    var lng = marker.getPosition().lng();
    var form2 = document.getElementsByName('fireLocation')[0]
    form2.elements["latitude"].value = lat
    form2.elements["longitude"].value = lng
    console.log(lat, lng)
    submitForm(fireLocations)
  })

  form.appendChild(submit)

  wrapper.append(form)


  var button = document.createElement('div')
  SetStyleToGoogle(button)
  button.style.display = "inline-block"
  button.style.marginLeft = "37%"
  
  button.style.boxShadow = "1px 1px 1px 1px #ccc"
  button.style.marginTop = ".7em"
  button.style.borderRadius = "20px"
  button.style.paddingLeft = "10px"
  button.style.paddingRight = "10px"
  button.innerHTML = "Add Fire"
  button.addEventListener("click", function() {
    console.log(isVisible)
    if (isVisible) {
      wrapper.style.visibility =  "hidden"
      isVisible = false
    } else {
      wrapper.style.visibility = "visible"
      isVisible = true
    }
  })
  // controlDiv.style.backgroundColor = "orange"
  controlDiv.appendChild(button)
  controlDiv.appendChild(wrapper)

}
function findLocation(infoWindow){
  // Try HTML5 geolocation.
  let pos
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position, pos) {
      pos = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
    return pos
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
function initMap() {
  fetch('/src/firelocations.csv')
  .then(response => {
    return response.text()
  }).then(data => { 
    
  var fireLocationStrings = data.split("\n")
  var fireLocations = []
  fireLocationStrings.pop() // the last elemnt is an empty string
  fireLocationStrings.forEach(element => {
    fireStrings = element.split(",")
    //console.log(fireStrings)
    var fireLocation = {
      latitude: parseFloat(fireStrings[0]),
      longitude: parseFloat(fireStrings[1]),
      severity: parseInt(fireStrings[2]),
      date: new Date(fireStrings[3])
    }
 
    fireLocations.push(fireLocation)
  });
    map = new google.maps.Map(
      document.getElementById('map'), {
        center: new google.maps.LatLng(-27.344, 131.036),
        zoom: 5
    });
    var customButtonDiv = document.createElement('div')
    var customButton = new AddLocation(customButtonDiv, map, fireLocations)
    customButtonDiv.index = 1
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(customButtonDiv);
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(customButtonDiv.children[0]);
    // var iconBase =
    //   'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    
    for(var i = 0; i<fireLocations.length; i++){
      let image;
      // var now = Date.now()
      if (fireLocations[i].date.getHours() - (new Date(Date.now())).getHours() > 72) {
        image = {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjeV1EhTwNiWoNIN6I36DDbeoBbCo-0nuMSbZ54RPsjBaNfXDVzQ&s',
          size: new google.maps.Size(71,71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(35, 35),
          scaledSize: new google.maps.Size(.5*fireLocations[i].severity,.5*fireLocations[i].severity)
        }
      } else {
        image = {
          url: 'https://vignette.wikia.nocookie.net/god-of-slaughter/images/d/dd/Earth_Flame.png/revision/latest?cb=20180515205947',
          size: new google.maps.Size(71,71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(35, 35),
          scaledSize: new google.maps.Size(.5*fireLocations[i].severity,.5*fireLocations[i].severity)
        }
      }
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(fireLocations[i].latitude, fireLocations[i].longitude),
          icon: image,
          map: map,
          draggable: true

        });
        actuallyCreateTheBox(marker, map , fireLocations[i]);
    }
    });
  }

function actuallyCreateTheBox(marker, map, fireLocation) {
  var myLatLng = marker.position;
  marker.addListener('click', function() {
    createInfoBox(myLatLng,map,fireLocation);
    map.setCenter(marker.getPosition());
  });
}
var TILE_SIZE = 256;
function createInfoBox(latlngcoords,map,fireLocation){
var coordInfoWindow = new google.maps.InfoWindow();
  coordInfoWindow.setContent(createInfoWindowContent(latlngcoords , map.getZoom(),fireLocation));
  coordInfoWindow.setPosition(latlngcoords);
  coordInfoWindow.open(map);
  map.addListener('zoom_changed', function() {
    coordInfoWindow.setContent(createInfoWindowContent(latlngcoords, map.getZoom(),fireLocation));
    coordInfoWindow.open(map);
  });
}
function createInfoWindowContent(latLng, zoom,fireLocation) {
  var scale = 1 << zoom;
  console.log("here")
  var worldCoordinate = project(latLng);

  var pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale),
      Math.floor(worldCoordinate.y * scale));

  var tileCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale / TILE_SIZE),
      Math.floor(worldCoordinate.y * scale / TILE_SIZE));
  
  var city = "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDa_r6nzSclWArAVRik9-tx2yk2jRRCHtM"
  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(), mm<10 ? '0'+ mm: mm, dd<10 ? '0'+ dd : dd].join('.');
  };
  console.log(fireLocation.date.yyyymmdd);
  return [
     latLng,
    'Severity: ' + String(fireLocation.severity),
    fireLocation.date.yyyymmdd()
  ].join('<br>');
}
function project(latLng) {
  var siny = Math.sin(latLng.lat() * Math.PI / 180);
  siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}
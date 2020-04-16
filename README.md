# ChromeExtension
This extension plays That's Amore - Dean Martin while randomly flashing pizzas and color across the screen. It then opens a new tab to the Google Maps search page with the query 'pizza' for the user the view the pizza places nearest to them.
 
# TO DO
Fade out music

/// if this will be used make sure to add getGeolocation() to the addEventListener callback function
function getGeolocation(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  alert("https://www.google.com/maps/search/pizza/@" + position.coords.latitude + "," + position.coords.longitude);
}
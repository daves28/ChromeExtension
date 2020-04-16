# ChromeExtension
    "browser_action": {
        "default_icon": "assets/pizza-icon.png",
        "default_popup": "index.html"
    },

    "background": {
        "scripts": ["background.js"],
        "persistent": true
    }



/// if this will be used make sure to add getGeolocation() to the addEventListener callback function
function getGeolocation(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  alert("https://www.google.com/maps/search/pizza/@" + position.coords.latitude + "," + position.coords.longitude);
}
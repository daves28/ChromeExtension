# TO DO
Open a new tab to google pizza search
Stop effects on previous page upon opening new tab (fade out music)
Have the pizzas change randomly with the overlay (remove pizzas and re add)


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
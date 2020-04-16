// CLICKING ON THE PAGE CHANGES COLOR
// document.querySelector("body").addEventListener('click', function () {
//     let overlay = document.createElement('div');
//     overlay.setAttribute('id', 'overlay');
//     overlay.setAttribute('style', 'position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 2; cursor: pointer;')
//     overlay.innerHTML = 'HELLO THIS IS WORKING'
//     document.querySelector("body").appendChild(overlay);
//     console.log("Applied overlay from content")
// })


//Receives message from background script to begin
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "start") {
            start();
        }
    });
    
var iterations = 0
let repeatOverlay
let repeatPizza
let backgroundMusic

//Primary function to start the overlay creation, pizza image creation, and background music
function start() {

    //Set Background music
    let music = document.createElement('audio')
    music.setAttribute('id', 'background-music');
    music.setAttribute('src', 'http://localhost:8080/assets/thats-amore.mp3');
    document.querySelector("body").appendChild(music);
    backgroundMusic = document.getElementById('background-music')
    // backgroundMusic.currentTime = Math.round(Math.random()*200);
    backgroundMusic.currentTime = 20;
    backgroundMusic.play() 


    //Create the overlay
    createOverlay();
    repeatOverlay = setInterval(createOverlay, 1000)

    //Generate pizza images
    createPizza();
    repeatPizza = setInterval(createPizza, 1000)
    
}

//Function to generate random color for overlay
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Function to generate the overlay element with a new random color
function createOverlay() {
    
    //Check if current overlay exists
    if (document.getElementById('overlay') !== null) {
        overlayToDelete = document.getElementById('overlay')
        overlayToDelete.parentNode.removeChild(overlayToDelete)
    }

    color = getRandomColor()
    //Create overlay element with style attribute, add it to the pages HTML element.
    let overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    overlay.setAttribute('style', `position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: ${color}; opacity: 0.4; z-index: 500000; cursor: pointer;`)
    document.querySelector("html").appendChild(overlay);
    
    iterations ++
    
    //Check iteration count to stop overlay iteration and pause music 5 seconds after the new tab opens
    if (iterations > 10) {
        clearInterval(repeatOverlay)

        function pauseMusic() {
            backgroundMusic.pause()
        }
        setTimeout(getSoundAndFadeAudio, 5000)
        // setTimeout(pauseMusic, 5000)
    }
}

//Function to generate pizza images randomly around the page, first deleting existing ones from previous iteration.
function createPizza() {
    pizzas = document.getElementsByClassName('pizza-img')
    while (pizzas[0]) {
        pizzas[0].parentNode.removeChild(pizzas[0]) 
    }

    //Generate random position
    let topPos = Math.ceil(Math.random() * (1200-100) + 200);
    let leftPos = Math.ceil(Math.random() * (1200-100) + 200);

    //Create pizza DIVs and images at random places on screen, adding appropriate class, id and styling
    for (let i = 0; i<14; i++) {
        // create pizza div tags to hold pizza image tags
        pizzaDiv = document.createElement('div')
        pizzaDiv.setAttribute('id', 'pizza-container')
        pizzaDiv.setAttribute('class', 'pizza')
        pizzaDiv.setAttribute('style', `position:fixed; width:20%;height:20%; top: ${topPos}px; left: ${leftPos}px;z-index:500001`)
        pizzaImg = document.createElement('img')
        pizzaImg.setAttribute('id', `pizza-${i}`)
        pizzaImg.setAttribute('class', `pizza-img`)
        // generate a random number 0-4 to get a random pizza image with switch cases
        randomPizzaImg = Math.ceil(Math.random()*4)
        let path
        switch (randomPizzaImg) {
            case 1:
                path = 'http://localhost:8080/assets/pizza-1.png'
                break
            case 2:
                path = 'http://localhost:8080/assets/pizza-2.png'
                break
            case 3:
                path = 'http://localhost:8080/assets/pizza-3.png'
                break
            case 4:
                path = 'http://localhost:8080/assets/pizza-4.png'
                break
        }
        pizzaImg.setAttribute('src', `${path}`)
        pizzaImg.setAttribute('style', 'width:180px; height:180px;')
        document.querySelector('html').appendChild(pizzaDiv)
        pizzaDiv.appendChild(pizzaImg)
        // topPos += 130
        // leftPos += 170
        topPos = Math.ceil(Math.random() * (900 - 0) + 0 );
        leftPos = Math.ceil(Math.random() * (1500-100) + 100);
    }
    
    iterations ++
    
    //Check how many times we've iterated to eventually send a message to the background script to open new Google Maps pizza search tab
    if (iterations > 10) {
        clearInterval(repeatPizza);
        chrome.runtime.sendMessage({
            "message": "createTab"
        });

        //Remove final overlays
        if (document.getElementById('overlay') !== null) {
            overlayToDelete = document.getElementById('overlay')
            overlayToDelete.parentNode.removeChild(overlayToDelete)
        }

        //Remove final pizzas
        pizzas = document.getElementsByClassName('pizza-img')
        while (pizzas[0]) {
            pizzas[0].parentNode.removeChild(pizzas[0]) 
            }
        }
}

function getSoundAndFadeAudio () {

    var sound = document.getElementById('background-music');

    // Set the point in playback that fadeout begins. This is for a 2 second fade out.
    // var fadePoint = sound.duration - 2; 

    var fadeAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if (sound.volume > 0) {
            sound.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume < 0.1) {
            clearInterval(fadeAudio);
        }
    }, 800);

}
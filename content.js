// CLICKING ON THE PAGE CHANGES COLOR
// document.querySelector("body").addEventListener('click', function () {
//     let overlay = document.createElement('div');
//     overlay.setAttribute('id', 'overlay');
//     overlay.setAttribute('style', 'position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 2; cursor: pointer;')
//     overlay.innerHTML = 'HELLO THIS IS WORKING'
//     document.querySelector("body").appendChild(overlay);
//     console.log("Applied overlay from content")
// })


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "start") {
            start();
        }
    });

function start() {
    //Set Background music
    let music = document.createElement('audio')
    music.setAttribute('id', 'background-music');
    music.setAttribute('src', 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Dee_Yan-Key/latin_summer/Dee_Yan-Key_-_03_-_Paso_Doble_Boat_Ahoy.mp3');
    document.querySelector("body").appendChild(music);
    let backgroundMusic = document.getElementById('background-music')
    backgroundMusic.currentTime = Math.round(Math.random()*200);
    backgroundMusic.play() 

    // setTimeout(backgroundMusic.pause, 10000);

    //Create the overlay
    createOverlay();

    //Generate pizza images
    let topPos = 50
    let leftPos = 50
    for (let i = 0; i<7; i++) {
        pizzaDiv = document.createElement('div')
        pizzaDiv.setAttribute('id', 'pizza-container')
        pizzaDiv.setAttribute('style', `position:fixed; width:10%;height:10%; top: ${topPos}px; left: ${leftPos}px;z-index:500001`)
        //`position: fixed; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: ${color}; opacity: 0.4; z-index: 500000; cursor: pointer;`
        pizzaImg = document.createElement('img')
        pizzaImg.setAttribute('id', `pizza-${i}`)
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
        pizzaImg.setAttribute('style', 'width:80px; height:80px;')
        document.querySelector('html').appendChild(pizzaDiv)
        pizzaDiv.appendChild(pizzaImg)
        topPos += 130
        leftPos += 170

    }
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

    setTimeout(createOverlay, 1000)
}



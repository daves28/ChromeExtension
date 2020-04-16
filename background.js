//THIS IS FOR CLICKING ON THE BUTTON IN THE POPUP
// function popup() {
//     chrome.tabs.query({
//         currentWindow: true,
//         active: true
//     }, function (tabs) {
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, {
//             "message": "start"
//         });
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("btn").addEventListener("click", popup);

// });


//THIS IS FOR AUTO TRIGGERING WHEN CLICKING THE EXTENSION BUTTON
chrome.browserAction.onClicked.addListener(function() {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
                "message": "start"
            });
        });
    })

// THIS IS FOR RECEIVING MESSAGE FROM CONTENT.JS RUNTIME TO OPEN NEW TAB AFTER INTERTION > 10
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "createTab") {
            chrome.tabs.create({
                url: 'https://www.google.com/maps/search/pizza/'
            })
        }
    });
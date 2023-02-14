//Define API KEYS
const _mlb_api_key = "5b51793475924af2b6a167f98ebb328d";

// MAKE SURE TO INSERT YOUR GOOGLE MAPS API KEY IN THE HTML FILE TOO!

//Initialize maps and data structures
var _scheduleData = {};
var _stadiumsDataMap = new Map();
var _teamsDataMap = new Map();
//Define URLs
var teamsURL = `https://api.sportsdata.io/v3/mlb/scores/json/AllTeams?key=${_mlb_api_key}`;
var stadiumsURL = `https://api.sportsdata.io/v3/mlb/scores/json/Stadiums?key=${_mlb_api_key}`;
var matchScheduleURL = `https://api.sportsdata.io/v3/mlb/scores/json/Games/2023PRE?key=${_mlb_api_key}`;

//Define Google Maps-related variables
let map;
let places;
let infoWindow;
let markers = [];
const MARKER_PATH =
  "https://developers.google.com/maps/documentation/javascript/images/marker_green";
const hostnameRegexp = new RegExp("^https?://.+?/");
const countries = {
  us: {
    center: { lat: 37.1, lng: -95.7 },
    zoom: 3,
  },
};
const options = {
    method: 'GET',
};

// define custom event
var loadedScheduleDataEvent = new CustomEvent("loadedScheduleDataEvent");
var loadedLocalStorageDataEvent = new CustomEvent("loadedLocalStorageDataEvent");
var loadedTeamsDataEvent = new CustomEvent("loadedTeamsDataEvent");
var loadedStadiumsDataEvent = new CustomEvent("loadedStadiumsDataEvent");
var renderedMatchCards = new CustomEvent("renderedMatchCards");

//Add event listeners
window.addEventListener("loadedTeamsDataEvent", function() {
    checkDataAndInit();
});
window.addEventListener("loadedStadiumsDataEvent", () => {
    checkDataAndInit();
});
window.addEventListener("loadedScheduleDataEvent", () => {
  checkDataAndInit();
});
window.addEventListener('DOMContentLoaded', (event) => {
    loadLocalStorageData();
});
//when page fully loads, listen for the on-click event on the search button for each game
window.addEventListener("renderedMatchCards", (event) => {
  initNearbyPlacesSearch();
});

//main entry point to the webpage, initializes the page.
function checkDataAndInit()
{
    //check all data is available
    if ( (window.localStorage.getItem("teamsData") != null) && (window.localStorage.getItem("stadiumsData") != null) && !(Object.keys(_scheduleData).length === 0 && _scheduleData.constructor === Object))
    {
      initApp();
    }
}

function initApp()
{
  //render match schedule/data
  renderMLBData();
  //if called twice, don't re-init
  initApp = function(){};
}

//loads data into the local storage (like cache) for fast access and efficient API calls
function loadLocalStorageData()
{
    if (window.localStorage.getItem("teamsData") == null)
    {
        //Only fetch if data does not exist.. ie: a new user.
        loadTeamsData();
    }
    else 
    {
        //If data already exists in local storage, don't fetch from API
        window.dispatchEvent(loadedTeamsDataEvent);
    }
    if (window.localStorage.getItem("stadiumsData") == null)
    {
        loadStadiumsData();
    }
    else
    {
        window.dispatchEvent(loadedStadiumsDataEvent);
    }
    //Always load match schedules on each refresh
    loadScheduleData();

}

//teams data includes name, ID, stdaium ID, stats, etc. 
function loadTeamsData()
{
    fetch(teamsURL, options)
        .then((response) => response.json())
        .then((data) => {
            window.localStorage.setItem("teamsData", JSON.stringify(data));
            //window.dispatchEvent(loadedTeamsDataEvent);
        });
}
loadTeamsData()

//stadium data includes name, ID, team, location (lat,lng), city, etc.
function loadStadiumsData()
{
    fetch(stadiumsURL, options)
        .then((response) => response.json())
        .then((data) => {
            window.localStorage.setItem("stadiumsData", JSON.stringify(data));
            //window.dispatchEvent(loadedStadiumsDataEvent);
        });
}
loadStadiumsData()

//schedule data includes the matches being played, their timings, date, teams playing, stadium id, etc.
function loadScheduleData()
{
    fetch(matchScheduleURL, options)
        .then((response) => response.json())
        .then((data) => {
            _scheduleData = data;
            window.dispatchEvent(loadedScheduleDataEvent);
        });
}
loadScheduleData()

function initNearbyPlacesSearch()
{
  _scheduleData.forEach((game) => {
    var stadium = _stadiumsDataMap.get(game.StadiumID);
    var searchBtn = document.getElementById(`searchButton-${game.GameID}`);
    if (searchBtn){
        searchBtn.onclick = function(){
            var request = {
                query: `${stadium.Name}, ${stadium.City}`,
                fields: ['geometry'],
              };
              //if clicked, search hotels nearby
              places.findPlaceFromQuery(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    map.panTo(results[0].geometry.location);
                    map.setZoom(13);
                    search();
                }
              });
        };
    }
})
}

//parse match data and render to screen
var divSandBox = document.getElementById("sandbox-div");
var stadiumsDataJson = JSON.parse(window.localStorage.getItem("stadiumsData"));
function renderMLBData()
{
  if (!stadiumsDataJson) {return}
  console.log(stadiumsDataJson);
  stadiumsDataJson.forEach((entry) => {
    _stadiumsDataMap.set(entry.StadiumID, entry);
  })
  const teamsDataJson = JSON.parse(window.localStorage.teamsData);
  
  teamsDataJson.forEach((entry) => {
    _teamsDataMap.set(entry.Key, entry);
  })
  
  var gameCardsHTML = "<div>";
  _scheduleData.forEach((game) => {
    //loop through each match, render a card showing match info
    var home = _teamsDataMap.get(game.HomeTeam);
    var away = _teamsDataMap.get(game.AwayTeam);
    var stadium = _stadiumsDataMap.get(game.StadiumID);
    gameCardsHTML += renderGameCard(game, home, away, stadium);
  });
  gameCardsHTML += "/<div>";
  divSandBox.innerHTML += gameCardsHTML;
  window.dispatchEvent(renderedMatchCards);
}

//render card showing match info
function renderGameCard(game, home, away, stadium)
{
  var gameCardDiv = "<div>";
    {
      gameCardDiv += `<h1> Game ID: ${game.GameID} </h1>`;
      gameCardDiv += `<h2>${game.HomeTeam} VS ${game.AwayTeam}</h2><br>`;
      gameCardDiv += `<p>${game.DateTime} <br>`;
      if(stadium){
        gameCardDiv += `Stadium: ${stadium.Name} <br>`;
        gameCardDiv += `( ${stadium.GeoLat} , ${stadium.GeoLong} ) <br>`;
      }
      gameCardDiv += `Home Team: ${home.Name} - Away Team: ${away.Name} <br>`
      gameCardDiv += `<button id="searchButton-${game.GameID}">Search hotels nearby</button></p><br><br>`;
    }
    gameCardDiv += "</div>";
    return gameCardDiv;
}

//Initialize google maps places API
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: countries["us"].zoom,
    center: countries["us"].center,
    mapTypeControl: false,
    panControl: true,
    zoomControl: false,
    streetViewControl: false,
  });
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById("info-content"),
  });
  places = new google.maps.places.PlacesService(map);
  // Create the DIV to hold custom control.
  const centerControlDiv = document.createElement("div");
  // Create the control.
  const centerControl = createCenterControl(map);

  // Append the control to the DIV.
  centerControlDiv.appendChild(centerControl);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}
function createCenterControl(map) {
    const controlButton = document.createElement("button");
  
    // Set CSS for the control.
    controlButton.style.backgroundColor = "#fff";
    controlButton.style.border = "2px solid #fff";
    controlButton.style.borderRadius = "3px";
    controlButton.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlButton.style.color = "rgb(25,25,25)";
    controlButton.style.cursor = "pointer";
    controlButton.style.fontFamily = "Roboto,Arial,sans-serif";
    controlButton.style.fontSize = "16px";
    controlButton.style.lineHeight = "38px";
    controlButton.style.margin = "8px 0 22px";
    controlButton.style.padding = "0 5px";
    controlButton.style.textAlign = "center";
    controlButton.textContent = "Search Nearby";
    controlButton.title = "Search Nearby";
    controlButton.type = "button";
    // Setup the click event listeners: simply search nearby hotels.
    controlButton.addEventListener("click", search);
    return controlButton;
  }

// Search for hotels in the selected city, within the viewport of the map.
function search() {
  const search = {
    bounds: map.getBounds(),
    types: ["lodging"],
  };

  places.nearbySearch(search, (results, status, pagination) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      clearResults();
      clearMarkers();

      // Create a marker for each hotel found, and
      // assign a letter of the alphabetic to each marker icon.
      for (let i = 0; i < results.length; i++) {
        const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
        const markerIcon = MARKER_PATH + markerLetter + ".png";

        // Use marker animation to drop the icons incrementally on the map.
        markers[i] = new google.maps.Marker({
          position: results[i].geometry.location,
          animation: google.maps.Animation.DROP,
          icon: markerIcon,
        });
        // If the user clicks a hotel marker, show the details of that hotel
        // in an info window.
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], "click", showInfoWindow);
        setTimeout(dropMarker(i), i * 100);
        addResult(results[i], i);
      }
    }
  });
}

function clearMarkers() {
  for (let i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }

  markers = [];
}

function dropMarker(i) {
  return function () {
    markers[i].setMap(map);
  };
}

function addResult(result, i) {
  const results = document.getElementById("results");
  const markerLetter = String.fromCharCode("A".charCodeAt(0) + (i % 26));
  const markerIcon = MARKER_PATH + markerLetter + ".png";
  const tr = document.createElement("tr");

  tr.style.backgroundColor = i % 2 === 0 ? "#F0F0F0" : "#FFFFFF";
  tr.onclick = function () {
    google.maps.event.trigger(markers[i], "click");
  };

  const iconTd = document.createElement("td");
  const nameTd = document.createElement("td");
  const icon = document.createElement("img");

  icon.src = markerIcon;
  icon.setAttribute("class", "placeIcon");
  icon.setAttribute("className", "placeIcon");

  const name = document.createTextNode(result.name);

  iconTd.appendChild(icon);
  nameTd.appendChild(name);
  tr.appendChild(iconTd);
  tr.appendChild(nameTd);
  results.appendChild(tr);
}

function clearResults() {
  const results = document.getElementById("results");

  while (results.childNodes[0]) {
    results.removeChild(results.childNodes[0]);
  }
}

// Get the place details for a hotel. Show the information in an info window,
// anchored on the marker for the hotel that the user selected.
function showInfoWindow() {
  // @ts-ignore
  const marker = this;

  places.getDetails(
    { placeId: marker.placeResult.place_id },
    (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }

      infoWindow.open(map, marker);
      buildIWContent(place);
    }
  );
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
  document.getElementById("iw-icon").innerHTML =
    '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
  document.getElementById("iw-url").innerHTML =
    '<b><a href="' + place.url + '">' + place.name + "</a></b>";
  document.getElementById("iw-address").textContent = place.vicinity;
  if (place.formatted_phone_number) {
    document.getElementById("iw-phone-row").style.display = "";
    document.getElementById("iw-phone").textContent =
      place.formatted_phone_number;
  } else {
    document.getElementById("iw-phone-row").style.display = "none";
  }

  // Assign a five-star rating to the hotel, using a black star ('&#10029;')
  // to indicate the rating the hotel has earned, and a white star ('&#10025;')
  // for the rating points not achieved.
  if (place.rating) {
    let ratingHtml = "";

    for (let i = 0; i < 5; i++) {
      if (place.rating < i + 0.5) {
        ratingHtml += "&#10025;";
      } else {
        ratingHtml += "&#10029;";
      }

      document.getElementById("iw-rating-row").style.display = "";
      document.getElementById("iw-rating").innerHTML = ratingHtml;
    }
  } else {
    document.getElementById("iw-rating-row").style.display = "none";
  }

  // The regexp isolates the first part of the URL (domain plus subdomain)
  // to give a short URL for displaying in the info window.
  if (place.website) {
    let fullUrl = place.website;
    let website = String(hostnameRegexp.exec(place.website));

    if (!website) {
      website = "http://" + place.website + "/";
      fullUrl = website;
    }

    document.getElementById("iw-website-row").style.display = "";
    document.getElementById("iw-website").textContent = website;
  } else {
    document.getElementById("iw-website-row").style.display = "none";
  }
}

window.initMap = initMap;

//var searchButton= document.getElementById("searchbutton")
//searchButton.addEventListener("click",function(){
//  loadStadiumsData()
//  load
//}) 
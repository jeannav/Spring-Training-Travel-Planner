var headerScrollEvent = () =>{
    if(this.scrollY >= 30){
        headerElement.classList('active-scroll');
    }else{
        headerElement.classList.remove('active-scroll');
    }
}

window.addEventListener('scroll', headerScrollEvent)


// Api Key for MLB
var apiKey = "3g4yzgm9guzr3hbmk39w7b5e";
var savedSearches = [];
//Api Key for google map 
var apiKey = "";
var savedSearches = [];
//Api Key for Tripadvisor 
var apiKey = "C8C1A5F7FC414996AF239F76C4832A9E";
var savedSearches = []; 



// This is listing previously searched 
var searchList = function(statumAddress) {
    $('.past-search:contains("' + statumAddress + '")').remove();

    // City name entry what city are we looking in 
    var searchListEntry = $("<p>");
    searchListEntry.addClass("past-search");
    searchListEntry.text(statumAddress);

// create container for entry
var searchEntryContainer = $("<div>");
searchEntryContainer.addClass("past-search-container");

// Append entry to container
searchEntryContainer.append(searchHistoryEntry);

// Append entry container to search list container
var searchListContainerEl = $("#search-history-container");
searchListContainerEl.append(searchEntryContainer);

if (savedSearches.length > 0){
    // update savedSearches array with previously saved searches
    var previousSavedSearches = localStorage.getItem("savedSearches");
    savedSearches = JSON.parse(previousSavedSearches);
}

// add city name to array of saved searches
savedSearches.push(cityName);
localStorage.setItem("savedSearches", JSON.stringify(savedSearches));

// reset search input
$("#search-input").val("");

};



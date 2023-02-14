
# Project Title: Spring Training Travel Planner📫 🚀 💡

As a baseball fan, I want to purchase game tickets and book a hotel near the stadium so that I can watch my favorite team play.

Spring Training Travel Planner we are building a website that allows users to search MLB game schedules for Spring Training and then buy tickets for select games and book a hotel near the location of the chosen games.

Provide a step by step process to users, instructing them to find the game and location they want to attend, and then using that info to book a nearby hotel room.
A list of games and locations would be created and then fixed tothe page so as the user scrolls below to select hotel booking options they will also have the list of selected games visibly available.

## Overview
- Demonstrated how Google Places API can be used with SportsData.io API to fetch MLB Spring Training matches and search hotels around the match venue.
## Implementation
- While page loads, on the DOMContentLoadedEvent, the module will try and load all MLB data ( Schedule, Teams, Stadiums )
- Teams & Stadiums data is cached locally to make efficient use of the APIs, so if a user already visited the page they won't require a new data fetch as data will still be cached.
- Schedule data could potentially change regularly so it is fetched on each refresh.
- Once MLB data is loaded and rendered, the map gets initialized.
- Click on the search button under any matches and the map will get updated at the top to show nearby hotels.
User can also navigate the map using the mouse and hit the "Search Nerby" to look for nearby hotels.


💡 ## Color Reference 💡

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |
| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |
| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |
| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |


🚀 ## Deployment

To deploy this project run

```bash
  link- https://github.com/jeannav/Spring-Training-Travel-Planner/tree/main
  Github link- https://jeannav.github.io/Spring-Training-Travel-Planner/
```


📫 ## Authors

- [Amanda Hardin](https://www.github.com/AHardin77)
- [Jeanna Vasquez-Garza](https://www.github.com/octokatherine)
- [Aaron DeVandry](https://www.github.com/octokatherine)


📫 ## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


💡 ## Resources Used
📫 Technologies Used 📫
- HTML
- CSS
- Javascript
- Jquery
- Tailwind CSS- 
- API Mlb- https://sportsdata.io/ 
- API Google Maps


💡 ## Screenshots

1. ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
2. 
3. 
4. 



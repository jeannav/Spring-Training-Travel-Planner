
# Project Title: Spring Training Travel Planner📫 🚀 💡

As a baseball fan, I want to search the MLB Spring Training schedule and book a hotel near the stadium so that I can watch my favorite team play.

Spring Training Travel Planner we are building a website that allows users to search MLB game schedules for Spring Training and then buy tickets for select games and book a hotel near the location of the chosen games.

Provide a step by step process to users, instructing them to find the game and location they want to attend, and then using that info to book a nearby hotel room.
A list of games and locations would be created and then fixed tothe page so as the user scrolls below to select hotel booking options they will also have the list of selected games visibly available.

## 🚀 Overview
- Demonstrated how Google Places API can be used with SportsData.io API to fetch MLB Spring Training matches and search hotels around the match venue.
## 🚀 Implementation
- While page loads, on the DOMContentLoadedEvent, the module will try and load all MLB data ( Schedule, Teams, Stadiums )
- Teams & Stadiums data is cached locally to make efficient use of the APIs, so if a user already visited the page they won't require a new data fetch as data will still be cached.
- Schedule data could potentially change regularly so it is fetched on each refresh.
- Once MLB data is loaded and rendered, the map gets initialized.
- Click on the search button under any matches and the map will get updated at the top to show nearby hotels.
User can also navigate the map using the mouse and hit the "Search Nerby" to look for nearby hotels.


💡 ## Color Reference 💡

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| background | #ffffff |
| text | color: #ffffff |
| background-color: |  gold!important |
| background-color | rgba(6, 6, 56, 1) |


🚀 ## Deployment

To deploy this project run

```bash
  link- https://github.com/jeannav/Spring-Training-Travel-Planner/tree/main
  Github link- https://jeannav.github.io/Spring-Training-Travel-Planner/
```


📫 ## Authors

- [Amanda Hardin](https://www.github.com/AHardin77)
- [Jeanna Vasquez-Garza](https://www.github.com/jeannav)
- [Aaron DeVandry](https://www.github.com/adevandry)


📫 ## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - Youtube tailwind
 


💡 ## Resources Used
📫 Technologies Used 📫
- HTML
- CSS
- Javascript
- Jquery
- Tailwind CSS 
- API MLB- https://sportsdata.io/ 
- API Google Maps


💡 ## Screenshots
1. <img width="1384" alt="Screen Shot 2023-02-14 at 2 22 37 PM" src="https://user-images.githubusercontent.com/109550438/218866188-d11485c3-5060-4239-8715-606ca85cb462.png">

2. <img width="1384" alt="Screen Shot 2023-02-14 at 2 22 47 PM" src="https://user-images.githubusercontent.com/109550438/218866206-9f7287bf-14d6-4f5d-a7de-13fe78a8f137.png">

3. <img width="1429" alt="Screen Shot 2023-02-14 at 2 23 06 PM" src="https://user-images.githubusercontent.com/109550438/218866339-7a795d8b-53d0-4040-a5b3-0da4e6fd9968.png">





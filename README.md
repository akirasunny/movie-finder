# movie-finder

• Purpose: App that asks users to enter the keyword to search for movies, allows them to like/unlike the results, and builds a profile of the user's likes and dislikes that then is used to recommend movies playing in theatres near the user's zip code that they might like.


• Front-end Features:   o Bootstrap modal for user login (stores the zip code in local storage and checks the Firebase database for users with that name. If it exists, it keeps adding to their likes/dislikes profile, if not, it creates a database for that user)
  o Search feature - to look for keywords in the www.omdbapi.com api.
  o Movies near me feature – to look for movies the user may like based on their preference profile from the Gracenote movie api.  


• Backend needs:
  o Capture user login info (Name, zipcode).
  o Capture user input – keywords
  o Calculate user's preferences and store them in a Firebase database


• Tools / Languages needs:
  o HTML, CSS, JavaScript / jQuery, Firebase, GitHub.

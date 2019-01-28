# About

I did this project while following along with the [Mastering React course](https://codewithmosh.com/p/mastering-react).
I took the exercises that were given in the course and did it in my own way while learning from the videos.
I have completed all but the last three sections of the course. Most of the project requirements came from the exercises
that were presented in the course, but I also added my own. I wrote the requirements after gaining an understanding of 
the tasks that I needed or wanted to accomplish. The requirements are in my own words. This project is part of my
self-learning initiative, and I wanted to learn and use React in a way that allowed me to explore what I can do
by doing things in ways that interested me.

This project uses very little CSS or any stylings. The goal was to focus on React and React Router. This project was created
using [Create React App](https://facebook.github.io/create-react-app/). To run this project, get the project and have Node.js
installed. Navigate to the root directory of this project. With NPM, use "npm install" in the command line. After everything
is installed, use "npm start" in the command line, and the project will be started in your default browser.

# Project Requirements

## At route /movies, the user should be able to
- View a list of movies that is sorted alphabetically by movie title in ascending order.
- Navigate among a list of page numbers to browse a list of movies by clicking on buttons corresponding
to page number.
- View which page number the user is currently on.
- View the total number of pages the user can navigate.
- View the number of total movies that much a given filter/search selection.
- View the number of movies that are currently being shown to the user.
- Like/unlike a movie by clicking a button with text "Like"/"Unlike" that corresponds to the movie.
- Delete a movie by clicking a button with text "Delete" that corresponds to the movie.
- Sort the list of movies in ascending/descending order by movie title, movie genre, number in stock.
for a movie, or the rating for a movie by selecting from a list of given options.
- Filter the list of movies by genre (by clicking a button that has text "Action", "Comedy", or "Thriller")
or see all movies (by clicking a button that has text "All Genres").
    - When user filters by genre, the text field for search by title should be empty.
- Search for a movie by title (case-insensitive) using a text field input and see the results as the user types.
    - When the users search by title, the genre filter should be set to view all genres.
- Click on the movie title (which is a link) and be navigated to route /movies/{movie-id}, 
- Add a new movie, by clicking a button with text "New Movie"
    - When user clicks this button, the user should be navigated to route /movies/new

## At route /movies/new, the user should be
- Able to view a form.
- Able to add new movie by submitting the form with valid information.
- Unable to add a new movie if any of the fields are invalid.
    - The movie title field is considered valid only if a non whitespace character is entered.
    - The movie genre field is considered valid only if a choice is made to choose among the valid list of genres.
    - The number in stock for a movie is considered valid only if a number between 0 and 100, inclusively, is
entered that can be represented as an integer.
    - The daily rental rate is considered valid only if a number between 0 and 5, inclusively, is entered.
- Able to view feedback when entering information into a field that is invalid and the feedback should go away once
the user enters valid information into that field.
- Navigated to route /movies when the user clicks the button with text "Save" and view that the new movie has 
been added (but may require navigating pages since the movies should be sorted by movie titles in ascending order).

## At route /movies/{movie-id}, the user should be able to
- View a form that is filled out with the details from the movie with the given id current information.
- Edit that movie's information (subject to same validation as adding a new movie).
- Be navigated to route /movies once the user clicks the button that has text "Save" (when all input
fields are in a valid state) and notice that the information about the particular movie has been saved.

## Other requirements:
- At route /customers (and any of its subroutes), the user should see text "Customers" on the page.
- At route /rentals (and any of its subroutes), the user should see text "Rentals" on the page.
- At route /, the user should be navigated to route /movies.
- At route /movies/{movie-id}, if the movie-id does not correspond to a movie that has an id that is the
given movie-id, the user should be navigated to route /not-found.
- At any other route not mentioned in this document, the user should be navigated to route /not-found.
- At route /not-found, if user presses the back button in the browser, the user should be navigated to the 
page that the user was at prior to navigating to the invalid url.
- After saving movie details at routes /movies/new and /moviews/{movie-id}, if the user presses the 
back button in the browser, the user is navigated to the page that the user was at prior to navigating to the
movie form and is not redirected back to the form.
- No movies added or changes to the movie data is persisted. If the user reloads the page, all changes made
should be erased. However, if a user goes to another route, the changes made by the user should remain.

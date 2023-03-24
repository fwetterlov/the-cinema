# Feature Flicks

Down below, I will explain what my subcomponents are and what they do.

## Navbar

To divide the navigation bar into a subcomponent was the most obvious decision because it's a subcomponent that I want to display on all routes but only want to write once. I used NavLink to create it, and it handles all the menu routing for my webpage.

## SelectCategory

When I started to work on the filtering for each category, I noticed that this feature increased in size a lot. So, I decided to break it out into a subcomponent. It handles both accessing all the categories available from the movies and creating the selection bar for the user to filter the movies.

## DisplaySeats

DisplaySeats can, by using the screeningID, create a graphical map for all the chairs and make the occupied seats not available for the user. In the function called toggleSeatSelection, I have created several if-statements that will make the user only choose adjacent chairs, only choose the same quantity of tickets they want to purchase, and the option to deselect seats before they confirm seats. I choose to only allow seats on the same row so if the user wants to buy a lot of tickets, they have to call the theater.

## DisplayMovieCard

This subcomponent will handle all the movie cards being displayed on the Movies route. It uses the Card class from react-bootstrap and makes every card a Link from react-router-dom. When the user clicks on a card, DisplayMovieCards also handles the rerouting using navigate to SelectTickets.


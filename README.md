# movies-movies-movies

Front-end wrapper for The Movie Database API. Consists of search for movie titles, lists of pre-defined movies from TMDB, lists of movies by Genre, lists of upcoming movies and the ability to mark movies as Liked, Disliked, or Want to See.

Each movie displays the poster image, release date, running time in minutes, genres, production companies, theatrical trailers from YouTube, and any colllection the movie is a part of. The BBFC and IFCO classifications are displayed if available.

Users can update their date preference in the settings section and these date preferences are reflected in the date pickers in the 'Upcoming' section.

## URL

[https://paddyfed.github.io/movies-movies-movies/](https://paddyfed.github.io/movies-movies-movies/)

## Install Instructions

You will need an API Read Access Token from [https://www.themoviedb.org/](https://www.themoviedb.org/)

Code repository is on GitHub: [https://github.com/paddyfed/movies-movies-movies](https://github.com/paddyfed/movies-movies-movies)  
Clone the repository and navigate to the repository folder in the terminal  
Run `npm install`  
Copy the API Read Access Token to `PUBLIC_API_ACCESS_TOKEN` in a .env file  
Add `https://api.themoviedb.org/` to `PUBLIC_API_URL` in the .env file  
Run `npm run dev` and the site should be up and running on `localhost:4321/movies-movies-movies`  
If deploying to GitHub Pages, update the `site` and `base` settings in `astro.config.mjs`

## Site Tree

```
Index
├── Genre
│   ├── Action
│   ├── Adventure
│   ├── Animation
│   ├── Comedy
│   ├── Crime
│   ├── Documentary
│   ├── Drama
│   ├── Family
│   ├── Fantasy
│   ├── History
│   ├── Horror
│   ├── Music
│   ├── Mystery
│   ├── Romance
│   ├── Science Fiction
│   ├── TV Movie
│   ├── Thriller
│   ├── War
│   └── Western
├── Upcoming
├── My Ratings
├── Settings
├── Credits
├── Movie
└── Collection
```

## Accessibility Score

[https://accessibilitytest.org/results/IJHgJ8GCyUw_](https://accessibilitytest.org/results/IJHgJ8GCyUw_)

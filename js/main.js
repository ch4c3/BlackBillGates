$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let genre = $('#genre').val();
      sessionStorage.setItem('genre', genre);
    getMovies(genre);
    e.preventDefault();
  });
});
function getImages(posterPath){

var url = "https://image.tmdb.org/t/p/w500/" + posterPath;
return url;

}
function getMovies(genre){
  //API query that allows user to search by genre
  axios.get('http://api.themoviedb.org/3/discover/movie?with_genres='+ genre + '&api_key=92f92290f10178b216db9b7c49ec780e')
  .then((response) => {
      // Success Case
      let movies = response.data.results;

      let output = '';
      var url = '';
        var image;
        var movieArray = [];

        var randomNum= 0;
        var randomNumArray = [];

        //put all of the movie objects returned into an array
            $.each(movies, (index, movie) => {
              movieArray.push(movie);
            });

            //generate a random number and then check to see if that number has already been generated
            for(var i = 0; i<6; i++){
                randomNum = Math.floor(Math.random() * movieArray.length);
                for(j=0; j < randomNumArray.length; j++){
                while(randomNum == randomNumArray[j]){
                  randomNum =  Math.floor(Math.random() * movieArray.length);
                }
              }
                //if that number hasnt been generated, add to the list of numbers
                randomNumArray.push(randomNum);

                //index the movies array at the random index and display the title and poster of that movie
                url = getImages(movieArray[randomNum].poster_path);
                  output += `<div class="col-md-2">
                  <div class="well text-center">
                  <img src=${url} height=256px; width=150px;>
                  <h5>${movieArray[randomNum].title}</h5>
                <a onclick="movieSelected('${movieArray[randomNum].id}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                  </div>
                  `;
}

      // Throws the output onto the page
      $('#movies').html(output);

  })
  .catch((error) => {
      // Error Case
      if (error.response) {
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error.config);
  });
}



// when the user has selected a movie this funciton will be called
function movieSelected(id){
  sessionStorage.setItem('movieID', id);
  window.location = 'movie.html';
  return false;
}
//populates the movies.html page with the movie selected
function getMovie(){

  let movieID = sessionStorage.getItem('movieID');
//call the more info API that returns more info about the movie
  axios.get('https://api.themoviedb.org/3/movie/'+ movieID + '?api_key=92f92290f10178b216db9b7c49ec780e&language=en-US')
  .then((response)=>{
    //since movie may have multiple genres, this ensures it will only show the genre which was selected
    let genreID = sessionStorage.getItem('genre');
    let movie = response.data;
    var i = 0;
    while(genreID != movie.genres[i].id){
      i++;
        }
      let genre = movie.genres[i].name;

      let image = getImages(response.data.poster_path);
      let output =`
      <div class="row">
        <div class="col-md-4">
          <img src="${image}" class="thumbnail" height=256px; width=150px;>
        </div>
        <div>
          <h2>${movie.original_title}</h2>
          <ul class="list-group">
        <li class="list-group-item>"<strong>Release Date: ${movie.release_date}</strong></li>
          <li class="list-group-item>"<strong>Genre: ${genre}</strong></li>
          <li class="list-group-item>"<strong>Production Company: ${movie.production_companies[0].name}</strong></li>
          <li class="list-group-item>"<strong>Famous Quote: "${movie.tagline}"</strong></li>
          </ul>
        </div>
        </div>
        <div class="row">
        <div class="well">
            <br>
          <h3>Plot</h3>
          ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDb</a>
            <a href="search.html" class="btn btn-primary">Go Back To Search</a>
            <a href="" class="btn btn-primary">Save Movie</a>
        </div>
        </div>
      `;
      // throws the output onto the page
        $('#movie').html(output);

  })
  .catch((error) => {
      // Error
      if (error.response) {
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error.config);
  });
}

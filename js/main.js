$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let genre = $('#genre').val();
    getMovies(genre);
    e.preventDefault();
  });
});
function getImages(posterPath){

var url = "https://image.tmdb.org/t/p/w500/" + posterPath;
return url;

}
function getMovies(genre){

  axios.get('http://api.themoviedb.org/3/discover/movie?with_genres='+ genre + '&api_key=92f92290f10178b216db9b7c49ec780e')
  .then((response) => {
      // Success Case

  //    console.log(response);
      let movies = response.data.results;
    //  console.log(movies);
    //  console.log(movies.original_title);
      let output = '';
      var url = '';
        var image;
        var movieArray = [];
        var finalMovieArray = [];
        var randomNum= 0;
        var randomNumArray = [];

            $.each(movies, (index, movie) => {

              movieArray.push(movie);


            });
            for(var i = 0; i<6; i++){
                randomNum = Math.floor(Math.random() * movieArray.length);
                for(j=0; j < randomNumArray.length; j++){
                while(randomNum == randomNumArray[j]){
                  randomNum =  Math.floor(Math.random() * movieArray.length);
                }
              }
                randomNumArray.push(randomNum);
                finalMovieArray.push(movieArray[randomNum]);
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
  //  saveMovie(finalMovieArray);
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

/*unction saveMovie(movieArray){
return movieArray;
}*/
// when the user has selected a movie this funciton will be called
function movieSelected(id){
  sessionStorage.setItem('movieID', id);
  window.location = 'movie.html';
  return false;
}
function getMovie(){
  let movieID = sessionStorage.getItem('movieID');
  axios.get('https://api.themoviedb.org/3/movie/'+ movieID + '?api_key=92f92290f10178b216db9b7c49ec780e&language=en-US')
  .then((response)=>{
  console.log(response);

  let movie = response.data;
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
          <li class="list-group-item>"<strong>Genre: ${movie.genres[0].name}</strong></li>
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

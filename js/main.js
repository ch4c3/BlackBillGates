$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});
function getMovies(searchText){

  axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=ce021223')
  .then((response) => {
      // Success Case
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `<div class="col-md-3">
        <div class="well text-center">
        <img src="${movie.Poster}">
        <h5>${movie.Title}</h5>
        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
        </div>
        </div>
        `;
      });
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
function getMovie(){
  let movieID = sessionStorage.getItem('movieID');

 // change the axios get html from s to i for the individual film
  axios.get('http://www.omdbapi.com/?i='+movieID+'&apikey=ce021223')
  .then((response) => {
      // Success
      console.log(response);
      let movie = response.data;

      let output =`
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
          <li class="list-group-item>"<strong>Genre:</strong>${movie.Genre}<li>
          <li class="list-group-item>"<strong>Released:</strong>${movie.Released}<li>
          <li class="list-group-item>"<strong>Rated:</strong>${movie.Rated}<li>
          <li class="list-group-item>"<strong>IMDb Rating:</strong>${movie.imdbRating}<li>
          <li class="list-group-item>"<strong>Director:</strong>${movie.Director}<li>
          <li class="list-group-item>"<strong>Writer:</strong>${movie.Writer}<li>
          <li class="list-group-item>"<strong>Actors:</strong>${movie.Actors}<li>
          </ul>
        </div>
        </div>
        <div class="row">
        <div class="well">
            <br>
          <h3>Plot</h3>
          ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDb</a>
            <a href="index.html" class="btn btn-primary">Go Back To Search</a>
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

$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});
function getMovies(searchText){
  // waiting for guy to send me api key
  axios.get('http://www.omdbapi.com?s='+searchText)
  .then((response) => {})
  .catch(err) => {
    console.log(err);};
}

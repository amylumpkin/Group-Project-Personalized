$(document).ready(function() {

  $.get("http://cors-anywhere.herokuapp.com/http://perdu.com", function(data) {
  });

  $(".row").css("display", "block");
  $(".search-results").css("display", "none");
  // Initializes all the variables and logs testing page
  console.log("testing page");

  var Lat;
  var Long;
  var city;
  var state;

  // function yelp(data) {};

  $(document).ready(function() {
    $.get('https://cors-anywhere.herokuapp.com/http://jsonip.com', function(res) {
      (console.log)('IP Address is: ' + res.ip);
    });
  });

  // accepts the user's input and splits the string into useable data for API's State, City

  $("#submit-button").on("click", function(event) {
    // console.log("button clicked");
    event.preventDefault();

    $(".row").css("display", "none"); //Amy added
    $(".search-results").css("display", "block");

    var inputResults = $("#input-city").val();
    console.log(inputResults);

    var address = inputResults.split(", ");
    state = address[1];
    city = address[0];

    //Below this line are all the Query URL's for the API's we are using.
    var queryURL =
      "http://api.wunderground.com/api/a4c1cc1f438c8eaf/conditions/q/" + state + "/" + city + ".json";


    //Console Logging all the query urls
    console.log(queryURL);
    // console.log(queryURLair);
    // console.log(queryURLyelpr);


    // This is our first API call for weather underground.  This API is important because it gives both the weather, temp, precipitaion, and the Location in Longitude and Latitude
    // I used success on this call to link to the function yelp.  The Yelp API requires longitude and latitude as parameters so the weather API must run first.

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
      console.log(response);
      console.log(response.current_observation.display_location.latitude);
      console.log(response.current_observation.display_location.longitude);

      const cityDiv = $('<div>')
      cityDiv.html(
        `<div id="city-name-here">
          <h1>${response.current_observation.display_location.full}</h1>
        </div>`
      )
      $('#city-name-here').html('')
      $('#city-name-here').append(cityDiv)


      const weatherDiv = $('<div>')
      weatherDiv.html(
        `<div id="weather">
        <h1>Weather</h1>
          <div class="row">
          <div style="padding: 10px;">
          <p>${response.current_observation.weather}</p>
          <p>Current Temperature: ${response.current_observation.temperature_string}</p>
          <p>Feels Like: ${response.current_observation.feelslike_string} F</p>
          <p>Precipitation: ${response.current_observation.precip_today_string}</p>
          <p>Dewpoint: ${response.current_observation.dewpoint_string}</p>
          <p>Wind: ${response.current_observation.wind_string}</p>
          <p>Wind Chill: ${response.current_observation.windchill_string}</p>
          <p>Humidity: ${response.current_observation.relative_humidity}</p>
            </div>
          </div>
        </div>`
      )
      $('#weather').html('')
      $('#weather').append(weatherDiv)


// var queryURLWalk
// "http://api.walkscore.com/score?format=json&address=" + state + "/" + city+"&wsapikey=292b7989ec6634e5f7029c66262218c8"
//
//       $.ajax({
//           url: queryURLWalk,
//           method: "GET"
//         }).then(function(response) {
//           console.log(queryURLWalk);

    });
  });
});
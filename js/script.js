
// Display
  // location
  // weather/temp icon, 
  // button to toggle F/C
    // make it render when the other data renders


$( document ).ready( function() {
  
  var lat;
  var long;
  var icon;
  var summary;
  var tempF;
  var image;
  var imgDesc;
  var dataColor;
  var scale = "f";
  var tempC
  
  // test for HTML geolocation
  if ("geolocation" in navigator) {
    return getGeo();
  } else {
    /* geolocation IS NOT available */
    console.log("no geolocation");
  } // end if-stmt
  
  // Get user location
  function getGeo() {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      return weather();
  
    }); // end getCurrentPosition()
  }; // end getGeo()
    

   function weather() {
     
     // using JSONP to avoid CORS issues
     $.ajax({
       url: 'https://api.darksky.net/forecast/cabd97e5008f00d57acb3763729be3af/' + lat + ',' + long,
       dataType: 'jsonp',
       success: function(data) {
         // REFACTOR? return & assign ALL obj props (using "this")?
         icon = data.currently.icon;
         tempF = (data.currently.temperature).toFixed(1);
         tempC = ((tempF - 32) * 5/9).toFixed(1);
         // console.log(tempC)
         summary = data.currently.summary;
         $('.temp').html(tempF + "&deg; F");
         $('.summary').html(summary);
         return ifWeather();
       },
       error: function() {
        $('.image').prepend('<img class="background" src="./img/error-flower.jpeg" alt="Weather not available" />');
       }
     }); // end ajax call 
    
     // displays data & images based on returned "icon" property
      // note: use images on pexels
     function ifWeather() {
       console.log(icon);
       $('.icon').html(icon);
       
       // // use switch stmt for results
       switch (icon) {
           
         case "clear-day":
           image = "./img/clear-sky-day.jpeg";
           imgDesc = "Clear Sky Day";
           break;
         case "clear-night":
           image = "./img/clear-sky-night.jpeg";
           imgDesc = "Clear Sky Night";
           dataColor = "white";
           break;
         case "rain":
           image = "./img/rain.jpeg";
           imgDesc = "Rain";
           break;
         case "snow":         
           image = "./img/snow.jpeg";
           imgDesc = "Snow";
           break;
         case "sleet":         
           image = "./img/sleet.jpeg";
           imgDesc = "Sleet";
           break;      
         case "wind":        
           image = "./img/wind.jpeg";
           imgDesc = "Windy";
           break;        
         case "fog":
           // result calls function           
           image = "./img/fog.jpeg";
           imgDesc = "Foggy";
           dataColor = "white"
           break;      
          case "cloudy":         
           image = ".img/cloudy.jpeg";
           imgDesc = "Cloudy Skies";
           break;        
          case "partly-cloudy-day":        
           image = "./img/partly-cloudy-day.jpeg";
           imgDesc = "Partly Cloudy Day";
           break;        
         case "partly-cloudy-night":       
           image = "./img/partly-cloudy-night.jpeg";
           imgDesc = "Partly Cloudy Night";
           dataColor = "white";
           break;
         // there may be other choices added later (hail, etc.)
         default:        
           image = "./img/error-flower.jpeg";
           imgDesc = "Weather Not Available";
           break; 
       }

       // end weather choices
       // render image for returned weather

       $('.image').prepend('<img class="background" src=' + image + ' alt=' + imgDesc + ' />');
       $('.data').css('color', dataColor);
     }
     
   // convert to C/F
   $('#convert').click(function() {
     if (scale === "f") {
       $('.temp').html(tempC + "&deg; C");
       $(this).html("Convert to &deg;F")
       scale = "c";
     } else {
       $('.temp').html(tempF + "&deg; F");
       $(this).html("Convert to &deg;C")
       scale = "f";
     }
   });
     
   } // end weather() 
  
  
}); // end document

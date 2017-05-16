$(document).ready(function() {
navigator.geolocation.getCurrentPosition(function(position) { // get position - need to us https if using chrome
   var lat = position.coords.latitude;
  var lon = position.coords.longitude;
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=8421ccdba1ed7d7315bbcdde0f687adf", function(json) {
     //gets weather information from open weather map
      var imageUrl; //initialize and set vars with values from open weather json
     var temp = json.main.temp; 
     var weather = json.weather[0].main; 
      var city = json.name; 
      var high = json.main.temp_max;
      var low = json.main.temp_min;
      //display values on page
      $("#temp").html(temp); 
      $("#description").html(weather);
      $("#city").html(city);
      $("#high").html(high+" &degF");
      $("#low").html(low+ " &degF");
      
      jQuery.fn.extend({ // allow for F/C toggle
    toggleText: function (a, b){
        var isClicked = false;
        var that = this;
        this.click(function (){ //sets values to F and displays on page
            if (isClicked) { that.text(a);
               temp = json.main.temp;
               high = json.main.temp_max;
               low = json.main.temp_min;
              $("#temp").html(temp);                      $("#high").html(high+" &degC");
             $("#low").html(low+ " &degC");
                 isClicked = false; }
            else { //sets value to C and displays on page 
              that.text(b); 
             isClicked = true;
             temp = convertToCelsius(temp);
             high = convertToCelsius(high);
             low = convertToCelsius(low);   
               $("#temp").html(temp);
               $("#high").html(high+" &degC");
                $("#low").html(low+ " &degC");
                 }
        });
        return this;
    }
});

$('#tempScale').toggleText(String.fromCharCode(176)+'F', String.fromCharCode(176)+'C');
      
      //sets background image depending on temp and conditions
      if (temp<35) { //cold, snow
      imageUrl = "http://cdn.images.express.co.uk/img/dynamic/128/590x/ice-cold-weather-502349.jpg";
        setBackground(imageUrl);
      }
      else if(weather === "Rain") { // rain
        imageUrl = "https://www.endurancenation.us/wp-content/uploads/2012/06/pouring_rain.jpg";
        setBackground(imageUrl);
      }
      else if (temp>75 && temp <95) { //tropical beach
        imageUrl = "http://cdn.pcwallart.com/images/most-beautiful-tropical-beaches-wallpaper-4.jpg";
        setBackground(imageUrl);
      }
      else if (temp >=95) { // desert
        imageUrl = "http://at-web.org/holiday-travel-online/photos/photo-Sahara-Desert-Algeria-pics-hh_dp17771412.jpg";
        setBackground(imageUrl);
      }
      else { // default - pleasant summer lake
        imageUrl = "http://s1.1zoom.net/big0/262/USA_Parks_Lake_Coast_444979.jpg"
        setBackground(imageUrl);
      }

    });    
}); 
});

function setBackground(imageUrl) { //sets background image
  $('.bk').css('background-image','url("'+imageUrl+'")');
}

function convertToCelsius(temp) { //converts F temp to C
   return (Math.round( ((temp-32)*.5556) * 10 ) / 10);
}

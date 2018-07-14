    //        var createRow = function(data) {
    //   // Get reference to existing tbody element, create a new table row element
    //   var tBody = $("tbody");
    //   var tRow = $("<tr>");

    //   // Methods run on jQuery selectors return the selector they we run on
    //   // This is why we can create and save a reference to a td in the same statement we update its text
    //   var restNameTd = $("<td>").text(data.businesses[0].name);
    //   var restAddressTd = $("<td>").text(data.businesses[0].location.display_address[0]);
    //   var actorsTd = $("<td>").text(data.Actors);
    //   // Append the newly created table data to the table row
    //   tRow.append(restNameTd, restAddressTdTd);
    //   // Append the table row to the table body
    //   tBody.append(tRow);
    // };
    $(document).ready(function () {
        $('.carousel').carousel();
  
        //    $('.carousel').carousel('methodName');
        // $('.carousel').carousel('methodName', paramName);
  
        // instance.next();
        // instance.next(4);
  
        $("#fb").on("click", function () {
          window.open('https://www.facebook.com', '_blank');
        });
  
        $("#ig").on("click", function () {
          window.open('https://www.instagram.com', '_blank');
        });
  
        $("#tw").on("click", function () {
          window.open('https://www.twitter.com', '_blank');
        });
  
        $("#pt").on("click", function () {
          window.open('https://www.pinterest.com', '_blank');
        });
  
  
  

   
        var lat = "";

        var long = [];

        var locations = "";

      
        //var long = data.businesses.coordinates.longitude;
        //var lat = data.businesses.coordinates.latitude;

        mapboxgl.accessToken = 'pk.eyJ1IjoiamFpY2xhcmsxOTk1IiwiYSI6ImNqajFucWl3cTB1Z20zcXQ0NmF0ZjlkencifQ.M2jx9yaj8_XQONjv9iJLjg';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v8',
            center: [-74.065881, 40.730752],
             zoom: 15

        
        });
        map.on('load', function() {
            map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function(error, image) {
                if (error) throw error;
                map.addImage('cat', image);
                map.addLayer({
                    "id": "points",
                    "type": "symbol",
                    "source": {
                        "type": "geojson",
                        "data": {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "Point",
                                    "coordinates": [-74.065881, 40.730752],
                                    "zoom": "3"
                                }
                            }]
                        }
                    },
                    "layout": {
                        "icon-image": "cat",
                        "icon-size": 0.10
                    }
                });
            });
        });

        

        console.log(mapboxgl);

        $("#user-zipcode").on('click', function (event) {
            // Preventing the button from trying to submit the form
            event.preventDefault();

            map.flyTo({
            center: [ -40.7282, 74.0776],
           speed: .25,
           curve: 1,
           zoom: 3,
           bearing: 0,

           easing: function(t) {
               return t;
           } 
        });

            // Storing the zipcode entered
            var inputZip = $("#zipcode-input").val().trim();

            locations = inputZip;
            console.log(locations);


            // Create variable query for latitude and longitude
            var YELP_API = "xvXQKslc5FPXMQbD9aUwiI6W94gAZBYARoPj7sjmYXwkWgwXdSiOFVA_YNdtK8zXoxMNA-DrY1twG3F15bShs8Fppu064vISP15QkCiB5wVwz5AadFZEzepPrCFAW3Yx";
            
           
            //User enters in the zipcode that they want to use for the search

            // concatenate the long (-74.065707) and lat (40.730771) into the yelp api url. With a limit of 10 search results for Pizzeria
            const yelpURL = "https://api.yelp.com/v3/businesses/search?term=wings&location=" + locations + "&limit=10";
             //https://api.yelp.com/v3/businesses/search?location=07065&limit=10

            // proxy URL to fix CORS issue
            const proxyURL = 'https://shielded-hamlet-43668.herokuapp.com/';
            

            $.ajax({
                // concatenate the proxyURL with the yelpURL for the CORS issue
                url: proxyURL + yelpURL,
                method: 'GET',

                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + YELP_API);
                },
                complete: function (response) {
                    // console.log(response);
                    // console.log(response.region);

                }

            }).done(function (data) {
                

                console.log(data);
                console.log(data.businesses[0].name, data.businesses[0].location.display_address[0], data.businesses[0].location.display_address[1]);
                console.log(data.businesses[1].name, data.businesses[1].location.display_address[0], data.businesses[1].location.display_address[1]);


                    
                for (i = 0; i < data.businesses.length; i++){
                    $("#bus-data").append(data.businesses[i].name + "<br>");
                    // $("#bus-data").append(data.businesses[i].location.display_address[i] + "<br>");
                }
                  
                  

            //    console.log(text);

            console.log(data.businesses[0].image_url);
            console.log(data.businesses[0].location.display_address);
            //     }

            var rName = data.businesses[0].name;
            var rLocation = data.businesses[0].location.display_address;
            var rlong = data.businesses[i]
           
            var newDiv = $('<div>');

            var childDiv = $('<div>');
            childDiv.append(rName);
            childDiv.append(rLocation);

            newDiv.append(childDiv);

            $('#text_printer').append(newDiv)

            });
        });

            
              
      });
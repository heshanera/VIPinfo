angular.module('app.controllers', [	])
  
.controller('vipinfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope, $ionicLoading) {
  

    /*
    console.log('map', 'reached that far');
    google.maps.event.addDomListener(window, 'load', function() {

        var myLatlng = new google.maps.LatLng(6.9021771, 79.8606821);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({ position: myLatlng, map: map });

        var infoWindow = new google.maps.InfoWindow({ content: "This is your current location!" });
        google.maps.event.addListener(marker, 'click', function () { infoWindow.open($scope.map, marker); }); 


        $scope.map = map;
    });

    */

    var ht = $(window).height();
    ht -= 90;
    $(".map-block").css({"height":ht});

    $(function(){     
        var lat = -33.8688,
            lng = 151.2195,
            latlng = new google.maps.LatLng(lat, lng),
            image = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png'; 
             
        var mapOptions = {           
                center: new google.maps.LatLng(lat, lng),           
                zoom: 13,           
                mapTypeId: google.maps.MapTypeId.ROADMAP         
            },
            map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions),
            marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: image
             });
         
        var input = document.getElementById('searchTextField');         
        var autocomplete = new google.maps.places.Autocomplete(input, {
            types: ["geocode"]
        });          
        
        autocomplete.bindTo('bounds', map); 
        var infowindow = new google.maps.InfoWindow(); 
     
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            infowindow.close();
            var place = autocomplete.getPlace();
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  
            }
            
            moveMarker(place.name, place.geometry.location);
        });  
        
        $("input").focusin(function () {
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    infowindow.close();
                    var firstResult = $(".pac-container .pac-item:first").text();
                    
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({"address":firstResult }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var lat = results[0].geometry.location.lat(),
                                lng = results[0].geometry.location.lng(),
                                placeName = results[0].address_components[0].long_name,
                                latlng = new google.maps.LatLng(lat, lng);
                            
                            moveMarker(placeName, latlng);
                            $("input").val(firstResult);
                        }
                    });
                }
            });
        });
         
         function moveMarker(placeName, latlng){
            marker.setIcon(image);
            marker.setPosition(latlng);
            infowindow.setContent(placeName);
            infowindow.open(map, marker);
         }
    });

    

}])
   
.controller('searchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	
	  



}])
   
.controller('aboutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('feedBackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('addInfoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 
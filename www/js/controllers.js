/* global angular, document, window */
'use strict';

angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('AddInfoCtrl', function($scope, $state, $cordovaGeolocation, $ionicPopup, $ionicLoading, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header 
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');


    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();


    var options = {timeout: 10000, enableHighAccuracy: true};
 
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map2"), mapOptions);

    
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });


        google.maps.event.addListener($scope.map, 'click', function(event) {
         placeMarker(event.latLng);
      });


      function placeMarker(location) {
          var marker1 = new google.maps.Marker({
              position: location, 
              map:$scope.map
          });
          marker1.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png') 
          google.maps.event.addListener(marker1, 'click', function () {
          $state.go("app.places");

      }); 
      }

      
    });
 
  }, function(error){
    console.log("Could not get location");
  });

    /*===================== adding new info ========================================*/

    $scope.newPlacelat = '';
    $scope.newPlacelng = '';
    $scope.buildingStreetName = '';
    $scope.vipName = '';
    $scope.vipInfo = '';
    $scope.references = '';

    $scope.showInputPopup = function(title,value) {

      $scope.data = {"value": value}
      // An elaborate, custom popup
      var editUserInfoPopup = $ionicPopup.show({
         template: '<input type="text" ng-model="data.value" class = "text-box-style">',
         title: 'Input '+title,
         //subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
            { 
              text: '<i class="icon ion-close-circled dark"></i>' 
            }, {
              text: '<i class="icon ion-checkmark-circled" ></i> ',
              onTap: function(e) {
                if (!$scope.data.value) {
                 //don't allow the user to close unless he enters info password
                 e.preventDefault();
                } else {


                  switch(title){
                    case 'Building/Street Name':
                      $scope.buildingStreetName = $scope.data.value;  
                      break;
                    case 'VIP\'s Name':
                      $scope.vipName = $scope.data.value;  
                      break;  
                  }

                  return $scope.data.value;
                }
              } 
            },
          ]
        });
        editUserInfoPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        /*
        $timeout(function() {
            editUserInfoPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
        */
    };

    $scope.showInputTextAreaPopup = function(title,value) {

      $scope.data = {"value": value}
      // An elaborate, custom popup
      var editUserInfoPopup = $ionicPopup.show({
         template: '<textarea rows="10" ng-model="data.value" class = "text-box-style">',
         title: 'Input '+title,
         //subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
            { 
              text: '<i class="icon ion-close-circled dark"></i>' 
            }, {
              text: '<i class="icon ion-checkmark-circled" ></i> ',
              onTap: function(e) {
                if (!$scope.data.value) {
                 //don't allow the user to close unless he enters info password
                 e.preventDefault();
                } else {


                  switch(title){
                    case 'VIP\'s information':
                      $scope.vipInfo = $scope.data.value;  
                      break;
                    case 'Other References':
                      $scope.references = $scope.data.value;  
                      break;  
                  }

                  return $scope.data.value;
                }
              } 
            },
          ]
        });
        editUserInfoPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        /*
        $timeout(function() {
            editUserInfoPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
        */
    };



})

.controller('ProfileCtrl', function($rootScope, $scope, $stateParams, $timeout, $cordovaGeolocation, $ionicPopup, ionicMaterialMotion, ionicMaterialInk, Profile) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    /*===================== getting user info ===============================*/

    var username = $rootScope.username;
    var user = Profile.getUserInfo(username);
    $scope.user = user;
    
    /*===================== getting user position ============================*/
    
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var lat  = position.coords.latitude;
      var lng = position.coords.longitude;

      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //console.log(results);
          if (results[1]) {
              var indice=0;
              for (var j=0; j<results.length; j++)
              {
                if (results[j].types[0]=='locality')
                {
                    indice=j;
                    break;
                }
              }
              //alert('The good number is: '+j);
              //console.log(results[j]);
              for (var i=0; i<results[j].address_components.length; i++)
              {
                if (results[j].address_components[i].types[0] == "locality") {
                    //this is the object you are looking for
                    var city = results[j].address_components[i];
                }
                if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    var region = results[j].address_components[i];
                }
                if (results[j].address_components[i].types[0] == "country") {
                    //this is the object you are looking for
                    var country = results[j].address_components[i];
                }
              }

              //city data
              //alert(city.long_name + " || " + region.long_name + " || " + country.short_name);
              $scope.userPosition = city.long_name + " " + region.long_name + " " + country.short_name;
              //alert(userPosition);

          } else {
              //alert("No results found");
              $scope.userPosition = "Could not get location";
          }
        } else {
            //alert("Geocoder failed due to: " + status);
            $scope.userPosition = "Could not get location";
        }
      });
    }, function(error){
        console.log("Could not get location");
    });

    /*===================== editing user info ========================================*/

    $scope.showPopup = function(title,value) {

      $scope.data = {"value": value}
      // An elaborate, custom popup
      var editUserInfoPopup = $ionicPopup.show({
         template: '<input type="text" ng-model="data.value" class = "text-box-style">',
         title: 'Change '+title,
         //subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
            { 
              text: '<i class="icon ion-close-circled"></i>' 
            }, {
              text: '<i class="icon ion-archive" ></i> ',
              onTap: function(e) {
                if (!$scope.data.value) {
                 //don't allow the user to close unless he enters info password
                 e.preventDefault();
                } else {
                 return $scope.data.value;
                }
              } 
            },
          ]
        });
        editUserInfoPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        /*
        $timeout(function() {
            editUserInfoPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
        */
    };

    /*===================== editing user password ========================================*/

    $scope.showPasswordPopup = function(title,value) {

      $scope.data = {"value": value}
      // An elaborate, custom popup
      var editUserInfoPopup = $ionicPopup.show({
         template:  'Current Password'+
                    '<input type="text" ng-model="data.value" class = "text-box-style"><br>'+
                    'New Password'+
                    '<input type="text" ng-model="data.new" class = "text-box-style"><br>'+
                    'Confirm Password'+
                    '<input type="text" ng-model="data.confirm" class = "text-box-style">',
         title: 'Change '+title,
         //subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
            { 
              text: '<i class="icon ion-close-circled"></i>' 
            }, {
              text: '<i class="icon ion-archive" ></i> ',
              onTap: function(e) {
                if (!$scope.data.value) {
                 //don't allow the user to close unless he enters info password
                 e.preventDefault();
                } else {
                 return $scope.data.value;
                }
              } 
            },
          ]
        });
        editUserInfoPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        /*
        $timeout(function() {
            editUserInfoPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
        */
    };

    /*===================== editing user current location ========================================*/

    $scope.showLocationPopup = function(title,value) {

      $scope.data = {"value": value}
      // An elaborate, custom popup
      var editUserInfoPopup = $ionicPopup.show({
         template: value,
         title: 'Update Location',
         //subTitle: 'Please use normal things',
         scope: $scope,
         buttons: [
            { 
              text: '<i class="icon ion-close-circled"></i>' 
            }, {
              text: '<i class="icon ion-loop" ></i> ',
              onTap: function(e) {
                if (!$scope.data.value) {
                 //don't allow the user to close unless he enters info password
                 e.preventDefault();
                } else {
                 return $scope.data.value;
                }
              } 
            },
          ]
        });
        editUserInfoPopup.then(function(res) {
            console.log('Tapped!', res);
        });
        /*
        $timeout(function() {
            editUserInfoPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
        */
    };



})

.controller('FavoritesCtrl', function($scope ,$rootScope ,$stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, Favorites) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 600);

    ionicMaterialInk.displayEffect();

    // getting user favorites
    var username = $rootScope.username;
    var favoritesArray = Favorites.getUserFav(username);
    $scope.favorite = favoritesArray;
    
    if ( $scope.favorite.length == 0 ) { $scope.favLength = 10; }
    else { $scope.favLength = $scope.favorite.length; }
    //alert($scope.favorite.length);

})

.controller('ActivityCtrl', function($scope, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, Activities) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 600);


    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    // getting user comments
    var username = $rootScope.username;
    var commentsArray = Activities.getUserComments(username);
    $scope.comments = commentsArray;

    if ( $scope.comments.length == 0 ) { $scope.commentSize = 10; }
    else { $scope.commentSize = $scope.comments.length; }

})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $ionicPopup, $ionicLoading) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
     
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });


      var mySurrounding = new google.maps.Circle({
        center: latLng,
        radius: 750, // 750m radius
        strokeColor: "#c4c4c4",
        strokeOpacity: 0.35,
        strokeWeight: 0,
        fillColor: '#7FFF00',
        fillOpacity: 0.2
      });
      mySurrounding.setMap($scope.map);

        google.maps.event.addListener($scope.map, 'click', function(event) {
         placeMarker(event.latLng);
      });

      function placeMarker(location) {
            var marker1 = new google.maps.Marker({
                position: location, 
                map:$scope.map
            });
            marker1.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png') 
            google.maps.event.addListener(marker1, 'click', function () {
            $state.go("app.places");

        }); 
      }

      var markerArray = new Array(); 
      google.maps.event.addListener(marker, 'click', function () {

          var noOfMarkers = markerArray.length;
          if (noOfMarkers > 0){
            for(var i = 0; i < noOfMarkers; i++) {
              markerArray[i].setMap(null);    
            }  
          }

          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          $scope.setMarker(lat+0.0010,lng+0.0030,markerArray);
          $scope.setMarker(lat+0.0030,lng-0.0025,markerArray);
          $scope.setMarker(lat-0.0050,lng+0.0026,markerArray);
      });      
     
    });
 
  }, function(error){
    console.log(error);
    console.log("Could not get location");
  });

  /***** serching the location **************************/


  /*
    // Triggered on a button click, or some other target
    $scope.showSearch = function() {
    $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="searchName">',
     title: 'Enter The Location',
     subTitle: 'name/address',
     scope: $scope,
     buttons: [
       { text: 'Close' },
       {
         text: '<b>Find</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.searchName) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.searchName;
           }
         }
       },
     ]
   });
    
   myPopup.then(function(res) { console.log('Tapped!', res); });
   $timeout(function() { myPopup.close(); }, 3000); };
    */

  /***** setting up location markers **************************/

  $scope.setMarker = function(lat,lng,markerArray){

      var latLng = new google.maps.LatLng(lat,lng);

      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
       
      google.maps.event.addListener(marker, 'click', function () {
          $state.go("app.place"); 
      }); 

      markerArray.push(marker);

  }

  /***** show places in the selected location **************************/

  $scope.showPlaces = function(){

      

  }


})

.controller('PlacesCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
})

.controller('PlaceCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
})
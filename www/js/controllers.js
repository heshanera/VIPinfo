/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

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
      zoom: 15,
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

})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
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
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
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
          $scope.setMarker(lat+0.0050,lng+0.0050,markerArray);
          $scope.setMarker(lat+0.0010,lng+0.0010,markerArray);
          $scope.setMarker(lat+0.0030,lng-0.0025,markerArray);
          $scope.setMarker(lat-0.0050,lng+0.0026,markerArray);
          $scope.setMarker(lat-0.0025,lng-0.0056,markerArray);
      });      
     
    });
 
  }, function(error){
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
          $state.go("app.places"); 
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
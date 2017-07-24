// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var firebaseConfig = {

    apiKey: "AIzaSyBRi8e_gUHCM7K5N3BinqBT4tQ49WGJVvU",
    authDomain: "vipinfo-76294.firebaseapp.com",
    databaseURL: "https://vipinfo-76294.firebaseio.com",
    projectId: "vipinfo-76294",
    storageBucket: "vipinfo-76294.appspot.com",
    messagingSenderId: "814303788166"

};

angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'ngCordova', 'firebase','starter.services'])


.run(function($ionicPlatform, $rootScope, $location, $firebaseAuth, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        firebase.initializeApp(firebaseConfig);
        $rootScope.username = 'heshan';


        /*
        $rootScope.firebaseUrl = firebaseUrl;
        $rootScope.displayName = null;

        $firebaseAuth.$onAuth(function (authData) {
            if (authData) {
                console.log("Logged in as:", authData.uid);
            } else {
                console.log("Logged out");
                $ionicLoading.hide();
                $location.path('/user');
            }
        });

        $rootScope.logout = function () {
            console.log("Logging out from the app");
            $ionicLoading.show({
                template: 'Logging Out...'
            });
            $firebaseAuth.$unauth();
        }

        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/user");
            }
        });
        */

    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */


    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.map', {
        url: '/map',
        views: {
            'menuContent': {
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.activity', {
        url: '/activity',
        views: {
            'menuContent': {
                templateUrl: 'templates/activity.html',
                controller: 'ActivityCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.map" id="fab-activity" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-map"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }
        }
    })

    .state('app.addInfo', {
        url: '/addInfo',
        views: {
            'menuContent': {
                templateUrl: 'templates/addInfo.html',
                controller: 'AddInfoCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.map" id="fab-addInfo" class="button button-fab button-fab-top-right button-energized-900 spin"><i class="icon ion-map"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-addInfo').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.favorites', {
        url: '/favorites',
        views: {
            'menuContent': {
                templateUrl: 'templates/favorites.html',
                controller: 'FavoritesCtrl'
            },
            'fabContent': {
                template: '<button  ui-sref="app.map"  id="fab-favorites" class="button button-fab button-fab-top-right expanded button-energized-900 spin"><i class="icon ion-map"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-favorites').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.map" id="fab-profile" class="button button-fab button-fab-top-right button-energized-900"><i class="icon ion-map"></i></button>',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })

    .state('app.places', {
        url: '/places',
        views: {
            'menuContent': {
                templateUrl: 'templates/places.html',
                controller: 'PlacesCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.map" id="fab-infos" class="button button-fab button-fab-top-right button-energized-900 spin"><i class="icon ion-map"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-infos').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })  

    .state('app.place', {
        url: '/place',
        views: {
            'menuContent': {
                templateUrl: 'templates/place.html',
                controller: 'PlaceCtrl'
            },
            'fabContent': {
                template: '<button ui-sref="app.map" id="fab-info" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-map"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-info').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })    
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});

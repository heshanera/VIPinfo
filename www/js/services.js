angular.module('starter.services', ['firebase'])
    .factory("Auth", ["$firebaseAuth", "$rootScope",
    function ($firebaseAuth, $rootScope) {
            var ref = new Firebase(firebaseUrl);
            return $firebaseAuth(ref);
}])

.factory('Profile', function ($firebase, $firebaseArray, $firebaseObject) {

    var rootRef = firebase.database().ref();
    var user = {
        'username':'',
        'name':'',
        'hometown':'',
        "email":'',
        'password':''
    }

    return {
        all: function () {
            return user;
        },
        getUserInfo: function (username) {
            console.log("loading user info: " + username);
            var dbUser = $firebaseObject(rootRef.child('user').child(username));
            dbUser.$loaded().then(function () {
                user.username = username;
                user.name = dbUser.name;
                user.hometown = dbUser.hometown;
                user.email = dbUser.email;
                user.password = dbUser.password;
            });
            return user;
        }
    }
})

.factory('Favorites', function ($firebase, $firebaseArray, $firebaseObject) {

    var rootRef = firebase.database().ref();
    var placeArray = [];
    var place = {
        'comment':'',
        'description':'',
        'image':'',
        "lat":'',
        'lng':'',
        'person':'',
        'place':'',
        'references':''
    }

    return {
        all: function () {
            return place;
        },
        getUserFav: function (username) {
            console.log("loading favorite info: " + username);
            var placeNameArray = $firebaseObject(rootRef.child('user').child(username).child('favorites'));

            console.log(placeNameArray);
            /*
            dbUser.$loaded().then(function () {
                user.username = username;
                user.name = dbUser.name;
                user.hometown = dbUser.hometown;
                user.email = dbUser.email;
                user.password = dbUser.password;
            });
            */
            return placeArray;
            
        }
    }
})
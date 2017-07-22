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
                user.hometown = dbUser.homeTown;
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

    return {
        all: function () {
            return place;
        },
        getUserFav: function (username) {
            console.log("loading favorite info: " + username);
            var placeNameArray = $firebaseArray(rootRef.child('user').child(username).child('favorites'));

            //console.log(placeNameArray);            
            placeNameArray.$loaded().then(function(){
                angular.forEach(placeNameArray, function(place) {
                    //console.log(place.$value);
                    var tmpPlace = $firebaseObject(rootRef.child('place').child(place.$value));
                    tmpPlace.$loaded().then(function () {

                        var placeObj = new Object();

                        placeObj.person = tmpPlace.person; 
                        placeObj.place = tmpPlace.place;
                        placeObj.description = tmpPlace.description; 
                        placeObj.image = tmpPlace.image;
                        placeObj.lat = tmpPlace.lat;
                        placeObj.lng = tmpPlace.lng; 
                        placeObj.references = tmpPlace.references; 
                        placeObj.comment = tmpPlace.comment;
                        //console.log(placeObj.place);

                        placeArray.push(placeObj);

                        //console.log(placeArray[0].person);
                    });
                })
            });

            return placeArray;
            
        }
    }
})
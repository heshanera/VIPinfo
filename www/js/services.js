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

    function createPlace(person, place, description, image, lat, lng, references, comment) {
        this.person = person;
        this.place = place;
        this.description = description;
        this.image = image;
        this.lat = lat;
        this.lng = lng;
        this.references = references;
        this.comment = comment;
    }

    return {
        all: function () {
            return place;
        },
        getUserFav: function (username) {
            console.log("loading favorite info: " + username);
            var placeNameArray = $firebaseArray(rootRef.child('user').child(username).child('favorites'));

            //console.log(placeNameArray);            
            placeNameArray.$loaded().then(function(){
                var i = 0;
                angular.forEach(placeNameArray, function(place) {
                    console.log(place.$value);

                    var tmpPlace = $firebaseObject(rootRef.child('place').child(place.$value));
                    tmpPlace.$loaded().then(function () {
                        console.log(tmpPlace.place);
                    });

                    /*
                    tmpPlace.$loaded().then(function () {
                        var placeObj = createPlace(
                            tmpPlace.person, 
                            tmpPlace.place, 
                            tmpPlace.description, 
                            tmpPlace.image, 
                            tmpPlace.lat, 
                            tmpPlace.lng, 
                            tmpPlace.references, 
                            tmpPlace.comment);
                        placeArray[0] = placeObj;
                        
                    });
                    */
                })
            });


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
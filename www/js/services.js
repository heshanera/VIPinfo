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
        'password':'',
        'profilepic':''
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
                user.profilepic = dbUser.profilePic;
            });
            return user;
        }
    }
})

.factory('Favorites', function ($firebase, $firebaseArray, $firebaseObject) {

    var rootRef = firebase.database().ref();
    
    return {
        all: function () {
            return place;
        },
        getUserFav: function (username) {
            console.log("loading favorite info: " + username);
            var placeArray = new Array();
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
                    });
                })
            });
            return placeArray;
            
        }
    }
})

.factory('Activities', function ($firebase, $firebaseArray, $firebaseObject) {

    var rootRef = firebase.database().ref();

    return {
        all: function () {
            return commentArray;
        },
        getUserComments: function (username) {
            console.log("loading comments: " + username);
            var finalCommentArray = new Array();
            var commentArray = $firebaseArray(rootRef.child('user').child(username).child('comment'));
            //console.log(commentArray);
            commentArray.$loaded().then(function(){
                angular.forEach(commentArray, function(comment) {
                    //console.log(comnent.$value);
                    var imgPath = $firebaseObject(rootRef.child('place').child(comment.place).child('image'));
                    var vipName = $firebaseObject(rootRef.child('place').child(comment.place).child('person'));

                    imgPath.$loaded().then(function () {
                        vipName.$loaded().then(function () {

                            var commentObj = new Object();

                            commentObj.topic = vipName.$value;
                            commentObj.comment = comment.comment;
                            commentObj.image = imgPath.$value;
                            commentObj.time =  comment.time;
                            finalCommentArray.push(commentObj);

                            //console.log(commentObj.image);
                        });    
                    });
                })
            });
            return finalCommentArray;
            
        }
    }
})
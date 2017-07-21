var config = {

    apiKey: "AIzaSyBRi8e_gUHCM7K5N3BinqBT4tQ49WGJVvU",
    authDomain: "vipinfo-76294.firebaseapp.com",
    databaseURL: "https://vipinfo-76294.firebaseio.com",
    projectId: "vipinfo-76294",
    storageBucket: "vipinfo-76294.appspot.com",
    messagingSenderId: "814303788166"

};


angular.module('starter.services', ['firebase'])
    .factory("Auth", ["$firebaseAuth", "$rootScope",
    function ($firebaseAuth, $rootScope) {
            var ref = new Firebase(firebaseUrl);
            return $firebaseAuth(ref);
}])

.factory('Profile', function ($firebase, $firebaseArray, $firebaseObject) {

    firebase.initializeApp(config);
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
            var dbUser = $firebaseArray(rootRef.child('user').child('heshan'));
            //console.log( $firebase(rootRef.child('user').child('heshan') ).$asArray() );
            /*
            selectedRoomId = roomId;
            if (!isNaN(roomId)) {
                chats = $firebase(rootRef.child('heshan').child(selectedRoomId).child('chats')).$asArray();
            }
            */
        }
    }
})
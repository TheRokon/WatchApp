angular.module('app.services', [])


.factory('fireBaseData', function($firebase) {
  var ref = firebase.database().ref(),
    refUser = firebase.database().ref("users"),
    refPost = firebase.database().ref("posts");
  return {
    ref: function() {
      return ref;
    },
    refUser: function() {
      return refUser;
    },
     refPost: function() {
      return refPost;
    }
  }
})


.factory('sharedUtils',['$ionicLoading','$ionicPopup', function($ionicLoading,$ionicPopup){


    var functionObj={};

    functionObj.showLoading=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ', // The text to display in the loading indicator
        animation: 'fade-in', // The animation to use
        showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
        maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
        showDelay: 0 // The delay in showing the indicator
      });
    };
    functionObj.hideLoading=function(){
      $ionicLoading.hide();
    };


    functionObj.showAlert = function(message) {
      var alertPopup = $ionicPopup.alert({
        template: message
      });
    };

    return functionObj;

}])




.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);


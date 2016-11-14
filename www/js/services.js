angular.module('app.services', [])


.factory('fireBaseData', function($firebase) {
  var ref = new Firebase("https://watchapp-7e459.firebaseio.com/"),
    refUser = new Firebase("https://watchapp-7e459.firebaseio.com/users"),
    refPost = new Firebase("https://watchapp-7e459.firebaseio.com/posts");
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


    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    return functionObj;

}])




  .factory('sharedpostService', ['$ionicPopup','fireBaseData','$firebaseArray',function($ionicPopup, fireBaseData, $firebaseArray){
    var uid ;// uid is temporary post_id

    var post={}; // the main Object


    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid=user.uid;
        /*post.post_items = $firebaseArray(fireBaseData.refPost().child(uid));*/
      }
    });




    //Add to Post
    post.add = function(item) {
      //check if item is already added or not
      fireBaseData.refPost().child(uid).once("value", function(snapshot) {

        if( snapshot.hasChild(item.$id) == true ){

          //if item is already in the post
          var currentQty = snapshot.child(item.$id).val().item_qty;

          fireBaseData.refPost().child(uid).child(item.$id).update({   // update
            item_qty : currentQty+1
          });

        }else{

          //if item is new in the post
          fireBaseData.refPost().child(uid).child(item.$id).set({    // set
            postText: item.text,
            postStatus: "0",
            postImage: "null",
            postVideo: "null",
            postDirect:"1",
            item_qty: 1
          });
        }
      });
    };

    post.drop=function(item_id){
      fireBaseData.refPost().child(uid).child(item_id).remove();
    };

    post.increment=function(item_id){

      //check if item is exist in the post or not
      fireBaseData.refPost().child(uid).once("value", function(snapshot) {
        if( snapshot.hasChild(item_id) == true ){

          var currentQty = snapshot.child(item_id).val().item_qty;
          //check if currentQty+1 is less than available stock
          fireBaseData.refPost().child(uid).child(item_id).update({
            item_qty : currentQty+1
          });

        }else{
          //pop error
        }
      });

    };

    post.decrement=function(item_id){

      //check if item is exist in the post or not
      fireBaseData.refPost().child(uid).once("value", function(snapshot) {
        if( snapshot.hasChild(item_id) == true ){

          var currentQty = snapshot.child(item_id).val().item_qty;

          if( currentQty-1 <= 0){
            post.drop(item_id);
          }else{
            fireBaseData.refPost().child(uid).child(item_id).update({
              item_qty : currentQty-1
            });
          }

        }else{
          //pop error
        }
      });

    };

    return post;
  }])



.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);


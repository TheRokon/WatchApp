var mod = angular.module('app.controllers', [])

mod.controller('sharedCtrl',  function($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,$window,$ionicHistory,$firebaseObject,sharedUtils,$ionicPopup) {
							
  //Check if user already logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user; //Saves data to user_info
      $scope.user=  $firebaseObject(fireBaseData.refUser().child(user.uid));
    }else {

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('login', {}, {location: "replace"});

    }
  
  });

  	$scope.loadPost = function() {

	var user = firebase.auth().currentUser;
	if(!user){

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('login', {}, {location: "replace"});
    }
	var uid = user.uid;
     sharedUtils.showLoading();
    /*$scope.posts=$firebaseArray(fireBaseData.refpost());*/
    var database = firebase.database();
    var VarPost = firebase.database().ref().child('posts').orderByChild('postUser').equalTo(uid);
    VarPost.on('value', function(snapshot){

          //Finally you get the 'posts' node and send to scope
          $scope.Aposts = snapshot.val();

        });
    sharedUtils.hideLoading();
};

$scope.shareTwitter =function()
{
	window.plugins.socialsharing.shareViaTwitter('Message and link via Twitter', null /* img */, 'http://www.x-services.nl');
}
$scope.showwhy=function(itemid){
firebase.database().ref('/posts/' + itemid).once('value').then(function(snapshot){sharedUtils.showAlert(""+snapshot.val().postRejectReason);});
};
   
     $scope.deleteItem=function(itemId){
	 
   $ionicPopup.confirm({
     title: 'Delete Post',
     template: 'Are you sure you want to delete this post ?'
   }).then(function(res) {
    sharedUtils.showLoading();
     if(res) {
         firebase.database().ref('/posts/' + itemId).once('value').then(function(snapshot){
		var imageFileName=snapshot.val().postImageName;
		if(imageFileName!='')
		{
		deleteFile(imageFileName)
		firebase.database().ref('/posts/' + itemId).remove();
		}
		else
		firebase.database().ref('/posts/' + itemId).remove();
		
		$scope.$apply();
		$state.go('tabsController.shared', {}, {location: "replace"});
  });
     }
			  sharedUtils.hideLoading();
   });


  }
    function deleteFile(fileName){
		var storageRef = firebase.storage().ref();
		var desertRef = storageRef.child('images/'+fileName);
		desertRef.delete();
  }
   
   
   
  // On Loggin in to menu page, the sideMenu drag state is set to true
  $ionicSideMenuDelegate.canDragContent(true);
  $rootScope.extras=true;

  // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope){
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
  });
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
  $scope.go=function(stateurl){
    $state.go(stateurl, {}, {location: "replace"});
  }
})

mod.controller('scheduleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


mod.controller('pendingCtrl', function ($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,
  $ionicHistory,$firebaseObject,sharedUtils) {

  var userid;
  //Check if user already logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      userid=user.uid;
      $scope.user_info=user; //Saves data to user_info
      $scope.user=  $firebaseObject(fireBaseData.refUser().child(user.uid));
    }else {

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('login', {}, {location: "replace"});

    }
  });

  // On Loggin in to menu page, the sideMenu drag state is set to true
  $ionicSideMenuDelegate.canDragContent(true);
  $rootScope.extras=true;

  // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope){
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
  });

  $scope.go=function(stateurl){
    $state.go(stateurl, {}, {location: "replace"});
  }

  $scope.loadPost = function() {
  var user = firebase.auth().currentUser;
  	if(!user){

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('login', {}, {location: "replace"});

    }
    sharedUtils.showLoading();
    /*$scope.posts=$firebaseArray(fireBaseData.refpost());*/
    var database = firebase.database();
    var VarPost = firebase.database().ref().child('posts').orderByChild('postUser').equalTo(user.uid);
    VarPost.on('value', function(snapshot){

          //Finally you get the 'posts' node and send to scope
          $scope.Aposts = snapshot.val();

        });
    sharedUtils.hideLoading();
    
  }

  $scope.showProductInfo=function (id) {

  };

})

mod.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

mod.controller('loginCtrl', function ($scope, $stateParams,$state,$rootScope,sharedUtils,$ionicHistory,$ionicSideMenuDelegate) {

  $scope.loginwithmail = function (  ) {

    $state.go('loginnormal');
  }
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('tabsController.shared', {}, {location: "replace"});

      }
    });

  })

mod.controller('loginNormalCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicPopup,$ionicSideMenuDelegate) {
		$rootScope.extras = false;  // For hiding the side bar and nav icon
      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
    // When the user logs out and reaches login page,
    // we clear all the history and cache to prevent back link
    $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });


    $scope.showAlertRules = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'WatchApp Terms',
       template: 'Dont do that asdasd, ad asdasd asda asd  aasd ....'
     });
   };
   $scope.signUpNow = function (  ) {

    $state.go('signup');
  };

    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true);  // Sets up the sideMenu dragable
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('tabsController.shared', {}, {location: "replace"});

      }
    });


    $scope.loginEmail = function(formName,cred) {

      if(formName.$valid) {  // Check if the form data is valid or not
        sharedUtils.showLoading();

          //Email
          firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('tabsController.shared', {}, {location: "replace"});

          },
          function(error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Authentication Error");
            console.log("ERROR: "+error); 
          }
          );

        }else{
          sharedUtils.showAlert("Entered data is not valid");
        }



      };


      $scope.loginFb = function(){
      //Facebook Login
    };

    $scope.loginGmail = function(){
      //Gmail Login
    };


  })



mod.controller('signupCtrl',function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,$state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon
      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
      $scope.signupEmail = function (formName, cred) {

      if (formName.$valid) {  // Check if the form data is valid or not

        sharedUtils.showLoading();

        //Main Firebase Authentication part
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {

            //Add name and default dp to the Autherisation table
            result.updateProfile({
              displayName: cred.username,
              //photoURL: "default_dp"
            }).then(function() {}, function(error) {
              sharedUtils.hideLoading();
              sharedUtils.showAlert("Sign up Error");
            });

            //Add features to the user table
            fireBaseData.refUser().child(result.uid).set({
              admin: false,
              adminname:"ozan",
              username:cred.username,
              image:"default.png"
            });

            //Registered OK
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $ionicSideMenuDelegate.canDragContent(false);  // Sets up the sideMenu dragable
            $rootScope.extras = true;
            sharedUtils.hideLoading();
            $state.go('tabsController.shared', {}, {location: "replace"});

          }, function (error) {
            sharedUtils.hideLoading();
            sharedUtils.showAlert("Sign up Error");
          });

      }else{
        sharedUtils.hideLoading();
        sharedUtils.showAlert("Entered data is not valid");
      }

    }

  })

mod.controller('draftsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicSideMenuDelegate) {
        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      }])

.controller('indexCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$q,$ionicSideMenuDelegate,$firebaseObject,fireBaseData,$cordovaImagePicker,$window,$cordovaFile,$ionicPlatform) {
 var uid ;
 var imageUrl=null;
    var usertemp=null;
      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; //Saves data to user_info
        $scope.user=  $firebaseObject(fireBaseData.refUser().child(user.uid));
        uid=user.uid;
      }else {
        $ionicHistory.nextViewOptions({
          historyRoot: false
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('login', {}, {location: "replace"});

      }
    });
    $scope.setProfileImage = function() {

	sharedUtils.showLoading();
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.ALLMEDIA,
        saveToPhotoAlbum: true

      };
      var fileName, path;

      $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        console.log('Image URI: ' + results[0]);
        fileName = results[0].replace(/^.*[\\\/]/, '');
		imageName=fileName;
          // modify the image path when on Android
          if ($ionicPlatform.is("android")) {
            path = cordova.file.cacheDirectory
          } else {
            path = cordova.file.tempDirectory
          }
          return $cordovaFile.readAsArrayBuffer(path, fileName);
        }, {
          maximumImagesCount: 1
        }).then(function (success) {
          // success - get blob data
          var imageBlob = new Blob([success], { type: "image/jpeg" });

          // missed some params... NOW it is a promise!!
          return saveToFirebase(imageBlob, fileName);
        }).then(function (_response) {
		  if(imageUrl==null)
          imageUrl="";
		  firebase.database().ref('users/' + uid).update({image:imageUrl});
		  sharedUtils.hideLoading();
         sharedUtils.showAlert("Profile image changed");
       }, function (error) {
          // error
		  	sharedUtils.hideLoading();
          console.log(error);
        });
      }
	
      function saveToFirebase(_imageBlob, _filename) {

        return $q(function (resolve, reject) {
        // Create a root reference to the firebase storage
        var storageRef = firebase.storage().ref();

        console.log('FILENAME FOR FIREBASE ' + _filename);
        // pass in the _filename, and save the _imageBlob
        var uploadTask = storageRef.child('user_images/' + _filename).put(_imageBlob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function (error) {
         console.log('ERRRORRR ' + error.message);
          // Handle unsuccessful uploads, alert with error message
          alert(error.message)
          reject(error)
        }, function () {
          // Handle successful uploads on complete
          var downloadURL = uploadTask.snapshot.downloadURL;
          imageUrl=downloadURL;
          // when done, pass back information on the saved image
          resolve(uploadTask.snapshot)
        });
      });
      }
      $scope.logout=function(){

        sharedUtils.showLoading();

      // Main Firebase logout
      firebase.auth().signOut().then(function() {

        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });


        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('login', {}, {location: "replace"});

      }, function(error) {
       sharedUtils.showAlert("Logout Failed")
     });

    }

  })

mod.controller('createPostCtrl',function($scope,$rootScope,sharedUtils,$cordovaImagePicker,$window,$cordovaFile,$ionicPlatform,$q,$ionicSideMenuDelegate,$state,$firebaseObject,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon
    var uid ;
	var adminName;
    var imageUrl=null;
	var imageName="";
    var usertemp=null;
	var facebookShared=true;
	var twitterShared=true;
	var instaShared=true;
	
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; //Saves data to user_info
        usertemp=user;
        $scope.user=  $firebaseObject(fireBaseData.refUser().child(user.uid));
        uid=user.uid;
		firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {adminName = snapshot.val().adminname;});
      }else {

        $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('login', {}, {location: "replace"});

      }
    });
    $scope.createPost = function (formName, post) {

      if (formName.$valid) {  // Check if the form data is valid or not

        sharedUtils.showLoading();

        if(usertemp.image==null)
          usertemp.image="";
        if(imageUrl==null)
          imageUrl="";

        if(post)
        {
                    fireBaseData.refPost().push({    // set
                      postText: post.text,
                      postStatus: false,
					  shared: false,
                      postImage: imageUrl,
                      postVideo: "",
                      postAdminChecked:false,
                      postUserImg:usertemp.image,
                      postUser: uid,
					  postImageName:imageName,
					  postRejectReason:"",
					  postAdmin: adminName,
					  twitter: twitterShared,
					  facebook: facebookShared,
					  instagram: instaShared
                    }).then(function (success) {
                      sharedUtils.hideLoading();

                      sharedUtils.showAlert("Successfully sent watcher");
                      $state.go('tabsController.shared', {}, {location: "replace"});

                    });

                  }
                  else
                  {
                    sharedUtils.hideLoading();
                    sharedUtils.showAlert("Please write something");
                  }

      }else{
        sharedUtils.hideLoading();
        sharedUtils.showAlert("Entered data is not valid");
      }

    }

    $scope.getPhoto = function() {
sharedUtils.showLoading();
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.ALLMEDIA,
        saveToPhotoAlbum: true

      };
      var fileName, path;

      $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        console.log('Image URI: ' + results[0]);
        fileName = results[0].replace(/^.*[\\\/]/, '');
		imageName=fileName;
          // modify the image path when on Android
          if ($ionicPlatform.is("android")) {
            path = cordova.file.cacheDirectory
          } else {
            path = cordova.file.tempDirectory
          }
          return $cordovaFile.readAsArrayBuffer(path, fileName);
        }, {
          maximumImagesCount: 1
        }).then(function (success) {
          // success - get blob data
          var imageBlob = new Blob([success], { type: "image/jpeg" });

          // missed some params... NOW it is a promise!!
          return saveToFirebase(imageBlob, fileName);
        }).then(function (_response) {
         sharedUtils.hideLoading();
         sharedUtils.showAlert("Image added");
       }, function (error) {
          // error
          console.log(error)
        });
      }
      function saveToFirebase(_imageBlob, _filename) {

        return $q(function (resolve, reject) {
        // Create a root reference to the firebase storage
        var storageRef = firebase.storage().ref();

        // pass in the _filename, and save the _imageBlob
        var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        }, function (error) {
          // Handle unsuccessful uploads, alert with error message
          alert(error.message)
          reject(error)
        }, function () {
          // Handle successful uploads on complete
          var downloadURL = uploadTask.snapshot.downloadURL;
          imageUrl=downloadURL;
          // when done, pass back information on the saved image
          resolve(uploadTask.snapshot)
        });
      });
      }
	  $scope.facebookStyle = "custom-icon-facebook";
	  $scope.twitterStyle = "custom-icon-twitter";
	  $scope.instagramStyle = "custom-icon-instagram";
	 
	  $scope.changeClassF=function(){
	  if($scope.facebookStyle==="custom-icon-facebook")
	  {
      $scope.facebookStyle = "custom-icon-nofacebook";
	  facebookShared=false;
	  }
	  else
	  {
	  $scope.facebookStyle = "custom-icon-facebook";
	  facebookShared=true;
	  }
	  }
	  
	  $scope.changeClassT=function(){
	  if($scope.twitterStyle==="custom-icon-twitter")
	  {
      $scope.twitterStyle = "custom-icon-notwitter";
	  twitterShared=false;
	  }
	  else
	  {
	  $scope.twitterStyle = "custom-icon-twitter";
	  twitterShared=true;
	  }
	  }
	  
	  $scope.changeClassI=function(){
	  if($scope.instagramStyle==="custom-icon-instagram")
	  {
      $scope.instagramStyle = "custom-icon-noinstagram";
	  instaShared=false;
	  }
	  else
	  {
	  $scope.instagramStyle = "custom-icon-instagram";
	  instaShared=true;
	  }
	  }
	  
	  $scope.goShared=function(){
	  $state.go('tabsController.shared', {}, {location: "replace"});
	  }

    })

mod.controller('adminCtrl', function ($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,
  $ionicHistory,$firebaseArray,$firebaseObject,sharedUtils,$location,$window,$ionicPopup) {

  var reasonAdmin="";
  //Check if user already logged in
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user; //Saves data to user_info
      $scope.user=  firebase.auth().currentUser;

    }else {

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $location.url('/login');

    }
  });

  // On Loggin in to menu page, the sideMenu drag state is set to true
  $rootScope.extras=true;

  // When user visits A-> B -> C -> A and clicks back, he will close the app instead of back linking
  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope){
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
  });

  $scope.loadAdminPost = function() {
    sharedUtils.showLoading();
	
	var user = firebase.auth().currentUser;
	if(!user){

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('login', {}, {location: "replace"});

    }
	
	  	firebase.database().ref('/users/' + user.uid).once('value').then(
		function(snapshot) 
		{
		 var VarPost = firebase.database().ref().child('posts').orderByChild('postAdmin').equalTo(snapshot.val().adminname);
    VarPost.on('value', function(snapshot){

          //Finally you get the 'posts' node and send to scope
          $scope.Aposts = snapshot.val();

        });
		});
    sharedUtils.hideLoading();
    
  }
  $scope.getUserName= function(uid)
  {

	firebase.database().ref('/posts/' + uid).once('value').then(
		function(snapshot) 
		{
		var unUserId=snapshot.val().postUser;
		firebase.database().ref('/users/' + unUserId).once('value').then(
		function(snapshot) 
		{
			$scope.unUserName=snapshot.val().username;
		});
		});
  }
  $scope.approve=function(postItem){
    console.log(postItem);
    firebase.database().ref('posts/' + postItem).update({postStatus:true,postAdminChecked:true});
	sharedUtils.showAlert("Accepted");
	 $scope.$apply();
  }
  $scope.reject=function(postItem){
  $scope.data = {}
	$ionicPopup.show({
    template: '<input type="text"  ng-model="data.reason">',
    title: 'Enter a reason for reject',
    subTitle: 'Please write a reason',
	scope:$scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>OK</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.reason) {
            e.preventDefault();
          } else {
            reasonAdmin = $scope.data.reason;
			  //POST DIRECT(0) = SEEN BY ADMIN
 firebase.database().ref('posts/' + postItem).update({postStatus:false,postAdminChecked:true,postRejectReason:reasonAdmin});
  sharedUtils.showAlert("Rejected");

  //$state.go('admin', {}, {location: "replace"});
          }
        }
      }
    ]
  });

}
})
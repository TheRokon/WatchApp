var mod = angular.module('app.controllers', [])

mod.controller('sharedCtrl',  function($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,
  $ionicHistory,$firebaseObject,sharedpostService,sharedUtils) {

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
    sharedUtils.showLoading();
    /*$scope.posts=$firebaseArray(fireBaseData.refpost());*/
    var database = firebase.database();
    var VarPost = firebase.database().ref().child('posts');
    VarPost.on('value', function(snapshot){

          //Finally you get the 'posts' node and send to scope
          $scope.Aposts = snapshot.val();

        });
    sharedUtils.hideLoading();
    
  }

  $scope.showProductInfo=function (id) {

  };
  $scope.addToPost=function(item){
    sharedpostService.add(item);
  };

})

mod.controller('scheduleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

mod.controller('pendingCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

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

.controller('indexCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$q,$ionicSideMenuDelegate,$firebaseObject,fireBaseData) {

      $ionicSideMenuDelegate.canDragContent(false);  // To remove the sidemenu white space
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; //Saves data to user_info
        $scope.user=  $firebaseObject(fireBaseData.refUser().child(user.uid));
      }else {
        $ionicHistory.nextViewOptions({
          historyRoot: false
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('login', {}, {location: "replace"});

      }
    });
    $scope.setProfileImage=function(selection){
      function setOptions(srcType) {
        var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
      }
      return options;
    }
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);

    if (selection == "picker-thmb") {
        // To downscale a selected image,
        // Camera.EncodingType (e.g., JPEG) must match the selected image type.
        options.targetHeight = 100;
        options.targetWidth = 100;
      }

      navigator.camera.getPicture(function cameraSuccess(imageData) {

        // Do something with image
        console.log('TRYING TO GET IMAGE');
        saveToFirebase(imageData,'denemee.png');
        console.log('BLOB IMAGE: '+BlobImage);

      }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

      }, options);

      function saveToFirebase(_imageBlob, _filename) {

        return $q(function (resolve, reject) {
        // Create a root reference to the firebase storage
        var storageRef = firebase.storage().ref();

        // pass in the _filename, and save the _imageBlob
        var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);
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

mod.controller('createPostCtrl',function($scope,$rootScope,sharedUtils,$cordovaImagePicker,$window,$cordovaFile,$ionicPlatform,$q,$ionicSideMenuDelegate,sharedpostService,$state,$firebaseObject,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; // For hiding the side bar and nav icon
    var uid ;
    var imageUrl=null;
    var usertemp=null;
    //Check if user already logged in
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; //Saves data to user_info
        usertemp=user;
        $scope.user=  $firebaseObject(fireBaseData.refUser().child(user.uid));
        uid=user.uid;
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
          usertemp.image="null";
        if(imageUrl==null)
          imageUrl="null";
        if(post)
        {
                    fireBaseData.refPost().push({    // set
                      postText: post.text,
                      postStatus: false,
                      postImage: imageUrl,
                      postVideo: "null",
                      postDirect:"1",
                      postUserImg:usertemp.image,
                      postUser: uid
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
        /*sharedpostService.add(post);
        */

      }else{
        sharedUtils.hideLoading();
        sharedUtils.showAlert("Entered data is not valid");
      }

    }

    $scope.getPhoto = function() {

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
    })



mod.controller('adminCtrl', function ($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,
  $ionicHistory,$firebaseArray,$firebaseObject,sharedpostService,sharedUtils,$location) {

  var userid;
  var database = firebase.database();
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
      $window.location.href='#/login';

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
    var VarPost = firebase.database().ref().child('posts');
    VarPost.on('value', function(snapshot){

          //Finally you get the 'posts' node and send to scope
          $scope.Aposts = snapshot.val();

        });
    sharedUtils.hideLoading();
    
  }
  $scope.approve=function(postItem){
    console.log(postItem);
    firebase.database().ref('posts/' + postItem).update({postStatus:true});
    $location.url('/admin');
  }
  $scope.reject=function(postItem){
    firebase.database().ref('posts/' + postItem).update({postStatus:false});
    $location.url('/admin');
  }
})
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.shared', {
    url: '/shared',
    views: {
      'tab1': {
        templateUrl: 'templates/shared.html',
        controller: 'sharedCtrl'
      }
    }
  })

  .state('tabsController.schedule', {
    url: '/schedule',
    views: {
      'tab2': {
        templateUrl: 'templates/schedule.html',
        controller: 'scheduleCtrl'
      }
    }
  })

  .state('tabsController.pending', {
    url: '/pending',
    views: {
      'tab3': {
        templateUrl: 'templates/pending.html',
        controller: 'pendingCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tabsCtrl',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('drafts', {
    url: '/drafts',
    templateUrl: 'templates/drafts.html',
    controller: 'draftsCtrl'
  })

  .state('createPost', {
    url: '/createPost',
    templateUrl: 'templates/createPost.html',
    controller: 'createPostCtrl'
  })

  .state('admin', {
    url: '/admin',
    templateUrl: 'templates/admin.html',
    controller: 'adminCtrl'
  })
  
$urlRouterProvider.otherwise('/login')

  

});
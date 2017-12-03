angular.module('app.routes', [])

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $localStorageProvider) {
  if(!ionic.Platform.isIOS())$ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.tabs.position('top');

  $localStorageProvider.setKeyPrefix('sos_');
  var store = $localStorageProvider.get('account');

  if (!store) {
    $localStorageProvider.set('account', {
      'name': null,
      'email': null,
      'password': null,
      'account': null
    });    
  }

  $stateProvider
  
  .state('sidemenu', {
    url: '/sidemenu',
    abstract:true,
    templateUrl: "templates/dashboard/sidemenu.html"
  })


  .state('sidemenu.tabview', {
    url: '/tabview',
    cache: false,
    views: {
      'main' :{
        templateUrl: "templates/dashboard/tab-view.html"      
      }
    }   
  })
  
  .state('sidemenu.tabview.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/dashboard/tab-home.html',        
      }
    }
  })

  .state('sidemenu.tabview.map', {
    url: '/map',
    views: {
      'tab2': {
        templateUrl: 'templates/dashboard/tab-map.html',
        controller: 'MapController'
      }
    }
  })

  .state('sidemenu.tabview.grafic', {
    url: '/grafic',
    views: {
      'tab3': {
        templateUrl: 'templates/dashboard/tab-grafic.html',
        controller: 'GraficController'
      }
    }
  })


  .state('sidemenu.menu-projeto', {
    url: '/menu-projeto',
    'views':{
      'main' :{
        templateUrl: 'templates/sidemenu/menu-projeto.html',
        controller: 'MenuController' 
      }
    }
  })

  .state('sidemenu.menu-login', {
    url: '/menu-login',
    'views' :{
      'main' :{
        templateUrl: 'templates/sidemenu/menu-login.html',
        controller: 'DashController' 
      }
    }
  })

  .state('sidemenu.menu-cadastrar', {
    url: '/menu-cadastrar',
    'views' :{
      'main' :{
        templateUrl: 'templates/sidemenu/menu-cadastrar.html',
        controller: 'DashController' 
      }
    }
  });

  $urlRouterProvider.otherwise('/sidemenu/tabview/map');
});
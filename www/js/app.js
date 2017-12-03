
var app = angular.module('app', ['ionic',
	'ngAnimate',
	'ngCordova',
  'ngStorage',
  'app.routes',
  'nvd3',
  'ion-fab-button',
  'googlechart'])

app.controller('grafico', function($scope){
  $scope.vm = {};
  $scope.vm.options = {
   chart: {
     type: 'pieChart',
     height: 500,
     x: function(d){return d.key;},
     y: function(d){return d.y;},
     showLabels: false,
     duration: 500,
     labelThreshold: 0.01,
     labelSunbeamLayout: true,
     legend: {
       margin: {
         top: 35,
         right: 35,
         bottom: 5,
         left: 0
       }
     },
     title: {   
      enable: true,
      text: 'Write Your Title',
      className: 'h4',
      css: {}
    }
  }
};

$scope.vm.data = [
{
 key: "Feminicidio",
 y: 9
},
{
 key: "Violência doméstica",
 y: 2
},
{
 key: "Violência sexual",
 y: 2
},
{
 key: "Violência racismo",
 y: 1
},
{
 key: "Violência lésbicas",
 y: 3
}
];
})
// .constant('host', 'http://node110789-env-2217200.jelasticlw.com.br/sos/api/v1/')
.constant('host', 'http://localhost/sos/api/v1/')
// .constant('host', 'http://app.sosmulheres.net.br/api/v1/')

app.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      console.log("platform is ready");
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
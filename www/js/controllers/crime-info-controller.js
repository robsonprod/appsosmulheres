app.controller('CrimeInfoController', function($scope, $ionicHistory, $state, $http, $cordovaDialogs, $localStorage, host) {
	
	$scope.myGoBack = function(){
		// $state.go('sidemenu.tabview');
		$ionicHistory.goBack();
	};

});
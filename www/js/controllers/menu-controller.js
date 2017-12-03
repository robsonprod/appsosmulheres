app.controller('MenuController', function($scope, $state, $ionicSideMenuDelegate, $ionicHistory) {
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	$scope.myGoBack = function(){
		$state.go('sidemenu.tabview');
	};
});
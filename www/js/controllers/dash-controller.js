app.controller('DashController', function($scope, $ionicHistory, $state, $http, $cordovaDialogs, $localStorage, host) {
	
	$scope.myGoBack = function(){
		// $state.go('sidemenu.tabview');
		$ionicHistory.goBack();
	};

	$scope.storage = $localStorage.account;

	$scope.account = {
		name: '',
		email: '',
		password: ''
	};


	$scope.login = function() {
		$http.post(host + 'login', this.account, {timeout: 20000}).then(loginDoneCallbacks, loginFailCallbacks);
	};



	$scope.isLogged = function(){
		if($scope.storage.email !== '' && $scope.storage.password !== ''){
			return true;
		}else{
			return false;
		}
	}

	function loginDoneCallbacks(response) {
		if (response.data.success) {
			$scope.storage.password = $scope.account.password;
			$scope.storage.account = response.data.user.id;
			$scope.storage.email = $scope.account.email;
			$scope.storage.name = response.data.user.name;
			$cordovaDialogs.alert("Login");
			$state.go('sidemenu.tabview');
		} else {
			var msg = '';

			response.data.errors.forEach(function(el, index){
				msg += el + '\n';

				if ((index + 1) == response.data.errors.length) {
					$cordovaDialogs.alert(msg);
				}
			});
		}
	}

	function loginFailCallbacks() {
	}

	$scope.cadastrar = function() {
		$http.post(host + 'store', this.account, {timeout: 20000}).then(cadDoneCallbacks, cadFailCallbacks);
	};

	function cadDoneCallbacks(response) {
		if (response.data.success) {
			$scope.storage.password = $scope.account.password;
			// $scope.storage.account = response.data.user.id;
			$scope.storage.email = $scope.account.email;
			$scope.storage.name = response.data.user.name;
			$cordovaDialogs.alert("Cadastro efetuado com sucesso!");
			$state.go('sidemenu.tabview');
		} else {
			var msg = '';

			response.data.errors.forEach(function(el, index){
				msg += el + '\n';

				if ((index + 1) == response.data.errors.length) {
					$cordovaDialogs.alert(msg);
				}
			});
		}
	}

	function cadFailCallbacks() {
	}

});
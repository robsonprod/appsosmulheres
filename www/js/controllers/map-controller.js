app.controller('MapController', function($scope, $state, $http, $cordovaGeolocation, $cordovaDialogs, $ionicModal, 
  $ionicLoading, $localStorage, $timeout, host, $ionicPopover, ConverterTipo) {

  $scope.markers = [];
  $scope.crimeView = null;
  $scope.storage = $localStorage.account;

  initialize();
  initDataForm();

  $ionicModal.fromTemplateUrl('templates/dashboard/modal/addcircle.html', {
    id: 'modalAddCrime',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalCircle = modal;
  });

  $scope.modalAddCircle = function() {
    $scope.closeModalInfoCircle();
    $scope.modalCircle.show();
  };

  $scope.closeModalCircle = function() {
    $scope.modalCircle.hide();
  };

  $ionicPopover.fromTemplateUrl('templates/dashboard/modal/filtro.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $ionicModal.fromTemplateUrl('templates/dashboard/modal/info-circle.html', {
    id: 'modalInfoCircle',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalInfoCrime = modal;
  });

  $scope.modalInfoCircle = function() {
    $scope.modalInfoCrime.show();
  };

  $scope.closeModalInfoCircle = function() {
    $scope.modalInfoCrime.hide();
  };

  $ionicModal.fromTemplateUrl('templates/dashboard/modal/info.html', {
    id: 'modalInfo',
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalInfo = modal;
  });

  $scope.modalAddInfo = function() {
    $scope.modalInfo.show();
  };

  $scope.closeModalInfo = function() {
    $scope.modalInfo.hide();
  };


  $scope.doCrime = function() {
    $ionicLoading.show({
      template: 'Processando...'
    });

    var request = angular.copy(this.dataForm);
    request.hora_crime = formatTime(this.dataForm.hora_crime);

    $http.post(host + 'crimes', request, {timeout: 20000}).then(doneCallbacks, failCallbacks)
    addCircle(new google.maps.LatLng(this.dataForm.latitude, this.dataForm.longitude), angular.copy($scope.dataForm));
    alert("Marcação adicionada, sujeita a verificação.");
    $ionicLoading.hide();
    initDataForm();
  };  

  $scope.filtrarCidadesByEstado = function() {
    $ionicLoading.show(function() {
      template: 'Processando...'
    });

    $http.get(host + 'cidades/' + this.dataForm.estado_id).then(function(response){
      $scope.cidades = response.data.cidades;
      $ionicLoading.hide();
    });
  };

  $scope.modalFiltroCidade = function() {
    $scope.modalAddCidade();
  };

  $scope.filtrar = function(){
    $http.get(host + 'crimes/cidade/' + this.dataForm.cidade_id + '/tipo/' + this.dataForm.tipo_crime).then(function(response){
      response.data.forEach(function(element) {
        addCircle(new google.maps.LatLng(element.local.latitude, element.local.longitude), element);
      });

      if(response.data.length > 0){
        var latitude = response.data[0].local.latitude;
        var longitude = response.data[0].local.longitude;

        $scope.map.setCenter(new google.maps.LatLng(latitude, longitude));
      }

      initDataForm();
    });

    $scope.closePopover();

  }

  $scope.visualizarCrime = function(crime){
    crime.tipo_crime = ConverterTipo.getTipoCrime(crime.tipo_crime);
    crime.tipo_local = ConverterTipo.getTipoLocal(crime.tipo_local);
    crime.tipo_meio = ConverterTipo.getTipoMeio(crime.tipo_meio);

    $scope.closeModalInfoCircle();
    $scope.crimeView = crime;
    $scope.modalAddInfo();
    console.log("modalAddInfo");
  };

  function initialize() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    var mapOptions = {
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $ionicLoading.show();

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      $scope.map.setCenter(latLng);
      setPropriedadesMap();

    }, function(error){
      console.log("Could not get location");
      var latLng2 = new google.maps.LatLng(-2.909713, -41.753699);
      $scope.map.setCenter(latLng2);
      setPropriedadesMap();
    });


    $http.get(host + 'estados').then(function(response){
      $scope.estados = response.data.estados;
    });
  }   

  function setPropriedadesMap(){
    google.maps.event.addListener($scope.map, 'click', function(event){

      $scope.dataForm.latitude = event.latLng.lat();
      $scope.dataForm.longitude = event.latLng.lng();
      $scope.modalAddCircle();
      console.log("modalAddCircle");

    });

    google.maps.event.addListener($scope.map, 'tilesloaded', function() {
      setTimeout(function() {
        $ionicLoading.hide();
      }, 1000);
    });

    addMarkerDelegacia();
  }

  function initDataForm() {
    $scope.dataForm = {    
      latitude: null,
      longitude: null,
      data_crime: null,
      hora_crime: null,
      tipo_crime: null,
      tipo_local: null,
      tipo_meio: null
    };
  }

// marcando areas de crimes
function addCircle(latLng, data){
  var color = '#ff5560';
  var _is = (data.local !== undefined && data.local.crimes !== undefined);

  if (_is) {
    var totalCrimes = data.local.crimes.length; 

    if (totalCrimes > 1) {
      color = '#a2000a';
    } 
  }

  var circle = new google.maps.Circle({
    strokeColor: '#ff5560',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    map: $scope.map,
    center: latLng,
    radius: 80
  });

  if (_is) {
    circle.addListener('click', function(event) {
      var compare = this;

      $scope.markers.forEach(function(el){
        if(Object.is(el.circle, compare)){     
          $scope.view = el.data.local.crimes;
          $scope.dataForm.latitude = el.data.local.latitude;
          $scope.dataForm.longitude = el.data.local.longitude;
        }
      });

      $scope.modalInfoCircle();
      console.log("modalInfoCircle");
    }); 
  }

  $scope.markers.push({circle: circle, data: data});
}

// adicionando delegacias

function addMarkerDelegacia() {
  var markersData = [
  {
    lat: -2.915166,
    lng: -41.768497,
    titulo: "Policia Civil - Delegacia da Mulher"
  },
  {
    lat: -2.909053,
    lng: -41.761257,
    titulo: "Policia Federal"
  }
  ];

  for (var i = 0; i < markersData.length; i++){
    var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
    var content = markersData[i].titulo;
    createMarkDelegacias(latlng, content);
  }
  $scope.map.setCenter(new google.maps.LatLng(markersData[0].lat, markersData[0].lng));
}

function createMarkDelegacias(latlng, content){
  var delegacia = '../../img/police.png';
  var image = {
    url: delegacia,
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(32, 32)
  };
  var marker = new google.maps.Marker({
    map: $scope.map,
    position: latlng,
    icon: image,
    title: content
  });

  var contentString = content;

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function doneCallbacks(response){
  $ionicLoading.hide();
  console.log(response);
  if (response.data.success) {
    $scope.modalCircle.hide();
    $scope.closeModalInfoCircle();
    console.log("modalCircle e modalInfoCircle hide");
  } else {
    console.log(response.data.msg);
    $cordovaDialogs.alert('Tivemos error ao processar sua requisão, tente novamente!', 'Atenção', 'Ok');
    $state.go('sidemenu.tabview.home');
  }
}

function failCallbacks() {
  $ionicLoading.hide();
  $scope.modalCircle.hide();
  $scope.dataForm.latitude = null;
  $scope.dataForm.longitude = null;
  $scope.dataForm.data_crime = null;
  $scope.dataForm.hora_crime = null;
  $scope.dataForm.tipo_crime = null;
  $scope.dataForm.tipo_local = null;
  $scope.dataForm.tipo_meio = null;
  console.log(response.data.msg);
  console.log(response);
  alert("Ocorreu algum erro interno. tente novamente");
}

function formatDate(date) {
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
}

function formatTime(time) {
  if (!time) return '00:00';

  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();

  return hours + ':' + minutes + ':' + seconds;
}
});
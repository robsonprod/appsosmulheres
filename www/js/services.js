app.factory('ConverterTipo', function(){
	return {
		getTipoCrime: function(tipo) {
			switch(tipo) {
				case 'VIOLENCIA_DOMESTICA_FAMILIAR':
				 	return 'Violência doméstica familiar';
				case 'FEMINICIDIO':
					return 'Feminicidio';
				case 'VIOLENCIA_DE_GENERO_NA_INTERNET':
					return 'Violência de genero na internet';
				case 'VIOLENCIA_SEXUAL':
					return 'Violência sexual';
				case 'VIOLENCIA_RACISMO':
					return 'Violência racismo';
				case 'VIOLENCIA_LESBICAS':
					return 'Violência lésbicas';
			};
		},
		getTipoLocal: function(tipo) {
			switch(tipo) {
				case 'ESCOLA':
				 	return 'Escola';
				case 'ESTABELECIM_COMERCIAL':
					return 'Estabelecimento comercial';
				case 'TRANSPORTE_COLETIVO':
					return 'Transporte coletivo';
				case 'RESIDENCIA':
					return 'Residência';
				case 'PRACA_PUBLICA':
					return 'Praça publica';
				case 'OUTROS':
					return 'Outros';
			};
		},
		getTipoMeio: function(tipo) {
			switch(tipo) {
				case 'ARMA_BRANCA':
				 	return 'Arma branca';
				case 'ARMA_DE_FOGO':
					return 'Arma de fogo';
				case 'ENFORCAMENTO_SUFOCACAO':
					return 'Enforcamento sufocação';
				case 'QUEIMADURAS':
					return 'Queimaduras';
				case 'OBJETO_CONTUNDENTE':
					return 'Objeto contundente';
				case 'FORCA_CORPORAL':
					return 'Força corporal';
				case 'OUTROS':
					return 'Outros';
			};
		}
	}
})

.service('BlankService', [function(){

}]);
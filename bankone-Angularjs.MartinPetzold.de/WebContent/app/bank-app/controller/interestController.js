'use strict';

/**
 * Modul zum Steuern des Zinsüberweisungservice
 */
var BankappInterest = angular.module( 'bankapp.interest', [
		 'bankapp.subview'

] );
/**
 * Controller zur Verwaltung des Zinsüberweisungservicekomponentenrahmens
 */
BankappInterest.controller( 'interestComponentCtrl', [
		'$scope', 'subComponentService', function ( $scope, subComponentService, BreadcrumbService ) {
			//Model zum Laden der Zinsüberweisungsteuerung
			var overview = {
				"id" : 1,
				"name" : "Zinsüberweisung",
				"url" : 'mainTopicTemplates/interestSubpageTemplates/interest.html'
			}
			
			subComponentService.reset();
			subComponentService.setComponent(overview);
			//Überwachung von Änderungen des subComponentService
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			}, function(){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
				
			} );
		}
] );
/**
 * Controller der Zinsüberweisungservicesteuerungsansicht
 */
BankappInterest.controller( 'InterestCtrl', ['$scope', '$http','$interval',function ( $scope, $http,$interval){
	//Models der Status der Steuerung
	$scope.loading={'state': "Laden",
			'label': "glyphicon glyphicon-time",
			'status': 'undefined',
			'text':"Lädt Status",
			'style':{'color':'orange'},
			'antistyle':{'color':'orange'},
			'item': "list-group-item list-group-item-warning"}
	$scope.state=$scope.loading
	$scope.inaktive={'state': "Starten",
			'label': "glyphicon glyphicon-ok",
			'status': true,
			'text':"Zinsüberweisung inaktiv",
			'style':{'color':'green'},
			'antistyle':{'color':'red'},
			'item': "list-group-item list-group-item-danger"} 
	
	$scope.aktive={'state': "Stoppen",
			'label': "glyphicon glyphicon-remove",
			'status': false	,
			'text':"Zinsüberweisung aktiv",
			'style':{'color':'red'},
			'antistyle':{'color':'green'},
			'item': "list-group-item list-group-item-success"} 
	
	$scope.serverstate='wird geladen'
//Function zum Starteb und Stoppen des Zinsüberweisungservice über REST
		/**
		 * param is boolean für die Entschedung ob Starten oder Stoppen
		 */
	$scope.click=function(is){
		if(is){
			$http.get('../../../../bankone/rest/ServiceREST/start').success(function() {
			})
		}else{
			$http.get('../../../../bankone/rest/ServiceREST/stop').success(function() {
			})	
			$scope.state=$scope.loading;	

		}
		
	}
	//Function zur Abfrage des Status des Zinsüberweisungservice über REST
	$scope.lookAtState=function(){
		$http.get('../../../../bankone/rest/ServiceREST/isActive').
		success(function(data) {
			if(data=="true"){
			$scope.state=$scope.aktive;
			}else{
			$scope.state=$scope.inaktive;
			}
			}).
		error(function(){alert("Server nicht erreichbar")})
	}
	//Zeitgesteuerte Abarbeitung einer Function
	$interval(function(){$scope.lookAtState()},500)
}]

);



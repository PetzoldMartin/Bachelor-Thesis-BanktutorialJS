'use strict';

/* Controllers */
var BankappInterest = angular.module( 'bankapp.interest', [
		 'bankapp.subview'

] );

BankappInterest.controller( 'interestComponentCtrl', [
		'$scope', 'subComponentService', function ( $scope, subComponentService, BreadcrumbService ) {

			var overview = {
				"id" : 1,
				"name" : "Zinsüberweisung",
				"url" : 'mainTopicTemplates/interestSubpageTemplates/interest.html'
			}
			
			subComponentService.reset();
			subComponentService.setComponent(overview);
			
			$scope.$watch( function () {
				return subComponentService.getActuallComponent();
			}, function(){
				$scope.Component_Lvl1 = subComponentService.getActuallComponent();
				
			} );
		}
] );

BankappInterest.controller( 'InterestCtrl', ['$scope', '$http','$interval',function ( $scope, $http,$interval){
	$scope.state={}
	
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
		
	$scope.click=function(is){
		if(is){
			$http.get('../../../../bankone/rest/ServiceREST/start')
		}else{
			$http.get('../../../../bankone/rest/ServiceREST/stop')	
		}
		
	}
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
	$interval(function(){$scope.lookAtState()},500)
}]

);



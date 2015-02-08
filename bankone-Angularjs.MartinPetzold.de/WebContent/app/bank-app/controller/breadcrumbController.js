'use strict';

/**
 * Modul zur Verwaltung der Breadcrumbleiste und des Breadcrumbservice
 */
var BankappBreadcrum = angular.module( 'bankapp.breadcrumb', [
		'bankapp.subview', 'bankapp.search'
] );
/**
 * Controller für die Breadcrumbleiste
 */
BankappBreadcrum.controller( 'breadcrumbCtrl', [
		'$scope', 'BreadcrumbService', 'subComponentService','mainPageService','searchService',

		function ( $scope, BreadcrumbService, subComponentService,mainPageService ,searchService) {
			//Function zur Rückkehr zur Startansicht
			$scope.tomain=function(){
				searchService.reset();
				mainPageService.setTopicid( 1 );
			}
			//Function zur Anzeige eines Aufrufs der Breadcrumbleiste
			/**
			 * param c Daten der zu setzenden Ansicht
			 */
			$scope.setComponent = function (c) {
				searchService.reset();
				
				subComponentService.setComponent(c);
				
			}
			//Überwachung von Änderungen des Breadcrumbservice
			$scope.$watch( function () {
					$scope.Breadcrumbs = BreadcrumbService.getBreadcrumbs()
						
			} );
			//Überwachung von Änderungen der neusten Eintragung in den Breadcrumbservice
			$scope.$watch( function () {
				mainPageService.setHeader(BreadcrumbService.getHighestBreadcrumb());
			});
		}
] );

/**
 * Service zur Verwaltung von Daten für die Breadcrumbs
 */
BankappBreadcrum.factory( 'BreadcrumbService', [
		 function () {

			var breadcrumbs = [];

			return {
				//Function zur eintragung eines Breadcrumbs
				/**
				 * param str einzutragende Daten
				 */
				setbreadcrumb : function (str){
					var CT=[];
					var x = false;
					angular.forEach(breadcrumbs, function(data) {
							if(data.name!=str.name && x==false){
								CT.push(data)
							}else{
								x=true
							}	
					})
					breadcrumbs=angular.copy(CT);
					breadcrumbs.push(str);
				},
				//Function zur Abfrage der Letzten Eintragung
				getHighestBreadcrumb : function () {
					return breadcrumbs[breadcrumbs.length-1]
				},
				//Function zur Löschung der Letzten Eintragung
				stepBack : function(){
					if(Components[Components.length-2]){
					this.setComponent(Components[Components.length-2])
					}
				},
				//Function zur Abfrage aller Eintragungen
				getBreadcrumbs : function () {
					return breadcrumbs
				},
				//Function zur Rücksetzung der internen Variable
				reset : function(){
					breadcrumbs=[];
					
				}
			}
		}
] )